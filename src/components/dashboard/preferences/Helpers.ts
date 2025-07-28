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

export const adjustPolicyName = (policyName: string): string => {
    switch(policyName.toLowerCase())
    {
      case "environment":
        return "variables";
      case "drive maps":
        return "drives";
      case "files":
        return "files";
      case "folders":
        return "folders";
      case "ini files":
        return "inis";
      case "network shares":
        return "shares";
      case "registry":
        return "registry";
      case "shortcuts":
        return "shortcuts";
    }

    return "";
  }
