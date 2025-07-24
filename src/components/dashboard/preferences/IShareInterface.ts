interface IShareInterface {
    action?: number
    name?: string
    path?: string
    comment?: string
    allRegular?: boolean
    allHidden?: boolean
    allAdminDrive?: boolean
    limitUsers?: string
    userLimit?: number
    accessBasedEnumeration?: string
}

export type { IShareInterface }