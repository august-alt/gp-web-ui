interface IFolderInterface {
    action?: string
    fromPath?: string
    readonly?: boolean
    archive?: boolean
    hidden?: boolean
    deleteIgnoreErrors?: boolean
    deleteFiles?: boolean
    deleteSubFolders?: boolean
    deleteFolder?: boolean
    deleteReadOnly?: boolean
}

export type { IFolderInterface }