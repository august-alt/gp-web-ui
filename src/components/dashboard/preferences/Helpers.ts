export const convertIndex = (action: number) => {
    switch (action)
    {
      case 0:
        return "Create";
      case 1:
        return "Replace";
      case 2:
        return "Update";
      case 3:
        return "Delete";
    }

    return "Create";
  }

export const getBasename = (filename: string | undefined): string => {
    return filename ? filename.split("/").pop() || "" : "";
}
