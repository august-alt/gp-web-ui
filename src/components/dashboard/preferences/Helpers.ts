export const convertIndex = (action: string | undefined) => {
    switch (action)
    {
      case "C":
        return "create";
      case "R":
        return "replace";
      case "U":
        return "update";
      case "D":
        return "delete";
    }

    return "create";
  }
