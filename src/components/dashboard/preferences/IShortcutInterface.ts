interface IShortcutInterface {
    action?: number
    pidl?:string
    shortcutPath?:string
    targetType?:number
    targetPath?:string
    location?:number
    arguments?:string
    startIn?:string
    window?:number
    comment?:string
    iconPath?:string
    iconIndex?:string
    shortcutKey?:string
}

export type { IShortcutInterface }