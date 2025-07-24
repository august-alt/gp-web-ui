interface IFileInterface {
    action?: number
    archive?: boolean
    executable?: boolean
    fromPath?: string
    hidden?: boolean
    readonly?: boolean
    suppress?: boolean
    targetPath?: string
 }

 export type { IFileInterface };