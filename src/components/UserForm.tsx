import { useState } from 'react';

type UserFormProps = {
  onSubmit: (formData: UserFormData) => void;
  initialData?: UserFormData;
};

export type UserFormData = {
  name: string;
  email: string;
  password?: string;
  role: string;
  positionId: string;
  webAuthnId?: string;
};

export default function UserForm({ onSubmit, initialData }: UserFormProps) {
  const [form, setForm] = useState<UserFormData>(initialData || {
    name: '',
    email: '',
    password: '',
    role: '',
    positionId: '',
    webAuthnId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      {initialData ? null : (
        <input name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      )}
      <input name="role" placeholder="Role" value={form.role} onChange={handleChange} required />
      <input name="positionId" placeholder="Position ID" value={form.positionId} onChange={handleChange} required />
      <input name="webAuthnId" placeholder="WebAuthn ID" value={form.webAuthnId || ''} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}