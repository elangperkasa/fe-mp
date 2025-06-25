import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { CircularProgress, debounce } from '@mui/material';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Fragment } from 'react/jsx-runtime';
import { useCallback, useEffect, useMemo, useState } from 'react';
import capitalize from '@mui/utils/capitalize';
import Chip from '@mui/material/Chip';
import { SxProps, Theme } from '@mui/material/styles';

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  required?: boolean;
}

export default function RHFAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  name,
  label,
  placeholder,
  helperText,
  required,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          onChange={(_event, newValue) => setValue(name, newValue, { shouldValidate: true })}
          renderInput={(params) => (
            <TextField
              label={label}
              placeholder={placeholder}
              error={!!error}
              helperText={error ? error?.message : helperText}
              required={required}
              {...params}
            />
          )}
          {...other}
        />
      )}
      aria-required={required}
    />
  );
}

// export function RHFAutocompleteAsync<
//   T,
//   Multiple extends boolean | undefined,
//   DisableClearable extends boolean | undefined,
//   FreeSolo extends boolean | undefined,
// >({
//   name,
//   label,
//   placeholder,
//   helperText,
//   loading,
//   required,
//   ...other
// }: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
//   const { control, setValue } = useFormContext();
//
//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <Autocomplete
//           {...field}
//           onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               label={label}
//               placeholder={placeholder}
//               error={!!error}
//               helperText={error ? error?.message : helperText}
//               InputProps={{
//                 ...params.InputProps,
//                 endAdornment: (
//                   <Fragment>
//                     {loading ? <CircularProgress color="inherit" size={20} /> : null}
//                     {params.InputProps.endAdornment}
//                   </Fragment>
//                 ),
//               }}
//               required={required}
//             />
//           )}
//           {...other}
//           aria-required={required}
//         />
//       )}
//     />
//   );
// }

export function RHFAutocompleteManualInput<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  name,
  label,
  placeholder,
  helperText,
  loading,
  required,
  options,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
  const { control, setValue } = useFormContext();

  const [optionData, setOptionData] = useState(options);
  const [inputValue, setInputValue] = useState('');

  function onFilter(keyword: string): void {
    const data = options.filter((option) => {
      const optionStr = option as string;
      return optionStr.toLowerCase().includes(keyword.toLowerCase());
    }) as T[];

    if (!data.length) {
      const capitalizeKeyword = capitalize(keyword);
      setOptionData([capitalizeKeyword] as T[]);
      return;
    }

    setOptionData(data);
  }

  useEffect(() => {
    if (!inputValue) {
      setOptionData(options);
      return;
    }

    setOptionData(options);
    onFilter(inputValue);
  }, [inputValue, options]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          options={optionData}
          inputValue={inputValue}
          onInputChange={(_event, newValue) => setInputValue(newValue)}
          onChange={(_event, newValue) => setValue(name, newValue, { shouldValidate: true })}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              error={!!error}
              helperText={error ? error?.message : helperText}
              InputProps={{
                ...params.InputProps,
                endAdornment: <Fragment>{params.InputProps.endAdornment}</Fragment>,
              }}
              required={required}
            />
          )}
          {...other}
          aria-required={required}
        />
      )}
    />
  );
}

type Value = {
  id: string;
  name: string;
};

type RHFAutocompleteAsyncProps = {
  name: string;
  label: string;
  multiple?: boolean;
  withManualInput?: boolean;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  initialValue?: string;
  initialValues?: Value[];
  asyncFn: (keyword?: string) => Promise<any>;
  renderId?: boolean;
  sx?: SxProps<Theme>;
};

export function RHFAutocompleteAsyncOnOpen({ multiple, ...others }: RHFAutocompleteAsyncProps) {
  if (multiple) {
    return <AutocompleteOnOpenMultiple {...others} />;
  }

  return <AutocompleteOnOpenSingle {...others} />;
}

export function RHFAutocompleteAsyncOnSearch({ multiple, ...others }: RHFAutocompleteAsyncProps) {
  if (multiple) {
    return <AutocompleteOnSearchMultiple {...others} />;
  }

  return <AutocompleteOnSearchSingle {...others} />;
}

export function AutocompleteOnOpenMultiple({
  name,
  label,
  withManualInput,
  helperText,
  disabled,
  required,
  asyncFn,
  sx,
}: RHFAutocompleteAsyncProps) {
  const { control, setValue: setFieldValue, getValues } = useFormContext();

  const [value, setValue] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [initialOptions, setInitialOptions] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const getOptions = useCallback(
    async (callback: (results?: string[]) => void) => {
      const results: string[] = await asyncFn();
      callback(results);

      setIsFetching(false);
    },
    [asyncFn]
  );

  const searchOption = useCallback(
    (keyword: string, callback: (results: string[]) => void) => {
      const results = initialOptions.filter((option) =>
        option.toLowerCase().includes(keyword.toLowerCase())
      );

      // Present keyword as the value option only if there's no data match the keyword
      if (withManualInput && !results.length) {
        const capitalizeKeyword = capitalize(keyword);
        callback([capitalizeKeyword]);

        return;
      }

      callback(results);
    },

    [initialOptions]
  );

  useEffect(() => {
    if (!inputValue) {
      setOptions(initialOptions);
      return undefined;
    }

    searchOption(inputValue, (results?: string[]) => {
      if (value) {
        setOptions([...value]);
      }

      if (results) {
        setOptions([...results]);
      }
    });

    return () => {};
  }, [inputValue]);

  const handleOpen = async () => {
    if (initialOptions.length) {
      setOptions(initialOptions);
      return;
    }

    setIsFetching(true);

    await getOptions((results?: string[]) => {
      if (results) {
        setOptions(results);
        setInitialOptions(results);
      }
    });
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          sx={sx}
          multiple
          disabled={disabled}
          onOpen={handleOpen}
          getOptionLabel={(option) => option}
          filterOptions={(x) => x}
          options={options}
          autoComplete
          includeInputInList
          filterSelectedOptions
          value={getValues(name) || value}
          noOptionsText="No options"
          loading={isFetching}
          onChange={(_event: any, newValue: string[]) => {
            setOptions(newValue ? [...newValue, ...options] : options);
            setValue(newValue);
            setFieldValue(name, newValue, { shouldValidate: true });
          }}
          onInputChange={(_event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              required={required}
              label={label}
              error={!!error}
              helperText={error ? error?.message : helperText}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isFetching ? (
                      <CircularProgress
                        color="inherit"
                        size={20}
                        sx={{ position: 'absolute', right: 16 }}
                      />
                    ) : null}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {capitalize(option)}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option}
                label={option}
                size="small"
                color="info"
                variant="soft"
              />
            ))
          }
          aria-required={required}
        />
      )}
    />
  );
}

export function AutocompleteOnOpenSingle({
  name,
  label,
  withManualInput,
  helperText,
  disabled,
  required,
  asyncFn,
  sx,
}: RHFAutocompleteAsyncProps) {
  const { control, setValue: setFieldValue } = useFormContext();

  const [value, setValue] = useState<string | null>();
  const [inputValue, setInputValue] = useState('');
  const [initialOptions, setInitialOptions] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const getOptions = useCallback(
    async (callback: (results?: string[]) => void) => {
      const results: string[] = await asyncFn();
      callback(results);

      setIsFetching(false);
    },
    [asyncFn]
  );

  const searchOption = useCallback(
    (keyword: string, callback: (results: string[]) => void) => {
      const results = initialOptions.filter((option) =>
        option.toLowerCase().includes(keyword.toLowerCase())
      );

      // Present keyword as the value option only if there's no data match the keyword
      if (withManualInput && !results.length) {
        const capitalizeKeyword = capitalize(keyword);
        callback([capitalizeKeyword]);

        return;
      }

      callback(results);
    },

    [initialOptions]
  );

  useEffect(() => {
    if (!inputValue) {
      setOptions(initialOptions);
      return undefined;
    }

    searchOption(inputValue, (results?: string[]) => {
      if (value) {
        setOptions([value]);
      }

      if (results) {
        setOptions([...results]);
      }
    });

    return () => {};
  }, [inputValue]);

  const handleOpen = async () => {
    if (initialOptions.length) {
      setOptions(initialOptions);
      return;
    }

    setIsFetching(true);

    await getOptions((results?: string[]) => {
      if (results) {
        setOptions(results);
        setInitialOptions(results);
      }
    });
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          sx={sx}
          disabled={disabled}
          onOpen={handleOpen}
          getOptionLabel={(option) => option}
          options={options}
          noOptionsText="No options"
          loading={isFetching}
          onChange={(_event: any, newValue: string | null) => {
            setOptions(newValue ? [newValue, ...options] : options);
            setValue(newValue);
            setFieldValue(name, newValue, { shouldValidate: true });
          }}
          onInputChange={(_event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              required={required}
              label={label}
              error={!!error}
              helperText={error ? error?.message : helperText}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isFetching ? (
                      <CircularProgress
                        color="inherit"
                        size={20}
                        sx={{ position: 'absolute', right: 16 }}
                      />
                    ) : null}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {capitalize(option)}
            </li>
          )}
          aria-required={required}
        />
      )}
    />
  );
}

export function AutocompleteOnSearchMultiple({
  name,
  label,
  withManualInput = false,
  helperText,
  disabled = false,
  required = false,
  asyncFn,
  initialValues = [],
  sx,
}: RHFAutocompleteAsyncProps) {
  const { control, setValue: setFieldValue } = useFormContext();

  const defaultOptions = [{ id: '', name: '' }];

  const [value, setValue] = useState<Value[]>(initialValues || []);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<Value[]>(defaultOptions);
  const [initialOptions, setInitialOptions] = useState<Value[]>(defaultOptions);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const getOptions = useMemo(
    () =>
      debounce(async (params: { keyword: string }, callback: (results?: Value[]) => void) => {
        try {
          const { data } = await asyncFn(params.keyword);

          let results = data.map((item: any) => ({
            id: item.id,
            name: item.name,
          }));

          if (
            withManualInput &&
            params.keyword &&
            !data.find((item: any) => item.name === params.keyword)
          ) {
            results = [{ id: params.keyword, name: capitalize(params.keyword) }, ...data];
          }

          callback(results);
        } catch (error) {
          console.error('Error fetching options:', error);
          callback([]);
        } finally {
          setIsFetching(false);
        }
      }, 400),
    [asyncFn, withManualInput]
  );

  useEffect(() => {
    if (!inputValue) {
      setOptions(initialOptions);
      return;
    }

    setIsFetching(true);

    getOptions({ keyword: inputValue }, (results?: Value[]) => {
      if (results) {
        setOptions(results);
      }
    });
  }, [inputValue]);

  const handleOpen = async () => {
    setIsFetching(true);

    await getOptions({ keyword: '' }, (results?: Value[]) => {
      if (results) {
        setOptions(results);
        setInitialOptions(results);
      }
    });
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          sx={sx}
          multiple
          disabled={disabled}
          onOpen={handleOpen}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          filterOptions={(x) => x}
          options={options}
          autoComplete
          includeInputInList
          filterSelectedOptions
          value={value}
          noOptionsText="No options"
          loading={isFetching}
          onBlur={() => setOptions(defaultOptions)}
          onChange={(event, newValue) => {
            const val = newValue.map((val) => val.id);
            setValue(newValue);
            setFieldValue(name, val, { shouldValidate: true });
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              required={required}
              label={label}
              error={!!error}
              helperText={error ? error.message : helperText}
              InputProps={{
                ...params.InputProps,
                endAdornment: isFetching ? (
                  <CircularProgress
                    color="inherit"
                    size={20}
                    sx={{ position: 'absolute', right: 16 }}
                  />
                ) : null,
              }}
            />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              {capitalize(option.name)}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option.id}
                label={option.name}
                size="small"
                color="info"
                variant="soft"
              />
            ))
          }
          aria-required={required}
        />
      )}
    />
  );
}

export function AutocompleteOnSearchSingle({
  name,
  label,
  withManualInput,
  helperText,
  disabled,
  required,
  renderId,
  initialValue,
  asyncFn,
  sx,
}: RHFAutocompleteAsyncProps) {
  const { control, setValue: setFieldValue } = useFormContext();

  const [value, setValue] = useState<string | null>(initialValue || null);
  const [inputValue, setInputValue] = useState('');
  const [baseOptions, setBaseOptions] = useState<any[]>([]);
  const [initialOptions, setInitialOptions] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const watchedValue = useWatch({ name, control });

  const getOptions = useMemo(
    () =>
      debounce(async (params: { keyword: string }, callback: (results?: string[]) => void) => {
        const { data } = await asyncFn(params.keyword);

        let results;

        if (renderId) {
          results = data.map((item: any) => `${item.name} - ${item.id}`);
        } else {
          results = data.map((item: any) => item.name);
        }

        // Present keyword as the value option only if there's no data match the keyword
        if (withManualInput && !results.length) {
          const capitalizeKeyword = capitalize(params.keyword);
          callback([capitalizeKeyword]);

          setIsFetching(false);
          return;
        }

        callback(results);

        setBaseOptions((prevOptions) => [...prevOptions, ...data]);

        setIsFetching(false);
      }, 400),

    []
  );

  useEffect(() => {
    if (!inputValue) {
      setOptions(initialOptions);

      return undefined;
    }

    setIsFetching(true);

    getOptions({ keyword: inputValue }, (results?: string[]) => {
      if (value) {
        setOptions([value]);
      }

      if (results) {
        setOptions([...results]);
      }
    });

    return () => {};
  }, [inputValue]);

  useEffect(() => {
    if (watchedValue === '') {
      setValue('');
      setInputValue('');
    }
  }, [watchedValue]);

  const handleOpen = async () => {
    setIsFetching(true);

    await getOptions({ keyword: '' }, (results?: string[]) => {
      if (results) {
        setOptions(results);
        setInitialOptions(results);
      }
    });
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          sx={sx}
          disabled={disabled}
          onOpen={handleOpen}
          getOptionLabel={(option) => option}
          filterOptions={(x) => x}
          options={options}
          autoComplete
          includeInputInList
          filterSelectedOptions
          value={value}
          noOptionsText="No options"
          loading={isFetching}
          onBlur={() => setOptions([])}
          onChange={(event: any, newValue: string | null) => {
            setOptions(newValue ? [newValue, ...options] : initialOptions);
            setValue(newValue);

            if (newValue) {
              const { id } = baseOptions.find((item) => {
                if (renderId) {
                  return item.id === newValue.split(' - ')[0];
                }

                return item.name === newValue;
              });

              setFieldValue(name, id, { shouldValidate: true });
            }

            setInputValue('');
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              required={required}
              label={label}
              error={!!error}
              helperText={error ? error?.message : helperText}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isFetching ? (
                      <CircularProgress
                        color="inherit"
                        size={20}
                        sx={{ position: 'absolute', right: 16 }}
                      />
                    ) : null}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {capitalize(option)}
            </li>
          )}
          aria-required={required}
        />
      )}
    />
  );
}
