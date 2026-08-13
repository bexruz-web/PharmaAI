// src/stores/scannerStore.ts
import { create } from 'zustand'
import { ScanAnalysisResult } from '../services/geminiScannerService'

interface ScannerState {
  isScannerOpen: boolean
  scanResult: ScanAnalysisResult | null
  scanPreviewUrl: string | null
  openScanner: () => void
  closeScanner: () => void
  setScanResult: (result: ScanAnalysisResult | null, previewUrl?: string | null) => void
  clearScanResult: () => void
}

export const useScannerStore = create<ScannerState>((set) => ({
  isScannerOpen: false,
  scanResult: null,
  scanPreviewUrl: null,
  openScanner: () => set({ isScannerOpen: true }),
  closeScanner: () => set({ isScannerOpen: false }),
  setScanResult: (result, previewUrl = null) =>
    set({ scanResult: result, scanPreviewUrl: previewUrl }),
  clearScanResult: () => set({ scanResult: null, scanPreviewUrl: null }),
}))
