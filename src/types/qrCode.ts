export type ILubesQrCode = {
  duplicate?: number;
  jmlScan?: number;
  jmlScan_Str?: string;
  lastAlamatMap?: string;
  lastLatitude?: string;
  lastLongitude?: string;
  lastScanTimestamp?: string;
  productCode: null;
  productName?: string;
  productPackaging?: string;
  productUnit?: string;
  productVolume?: string;
  productionBatch?: string;
  kategoriKendaraan?: string;
  qrCode: string;
  seriesId?: string;
};

export type IQrCodeProps = {
  duplicate?: number;
  jmlScan?: number;
  jmlScan_Str?: string;
  lastAlamatMap?: string;
  lastLatitude?: string;
  lastLongitude?: string;
  lastScanTimestamp?: string;
  productCode: null;
  productName?: string;
  productPackaging?: string;
  productUnit?: string;
  productVolume?: number;
  productionBatch?: string;
  code: string;
  seriesId: string;
  url?: string;
};
