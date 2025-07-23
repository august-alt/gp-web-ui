interface IDriveMapInterface {
    action?: string
    path?: string
    label?: string
    userName?: string
    cpassword?: string
    persistent?: boolean
    useLetter?: boolean
    letter?: string
    thisDrive?: number
    allDrives?: number
}

export type { IDriveMapInterface }