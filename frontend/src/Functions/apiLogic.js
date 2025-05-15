import { useQuery, useMutation } from "@tanstack/react-query";

const fetchData = async (endpoint, used_method = "GET") => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
      method: used_method,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (!data) {
      throw new Error(data?.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("Cannot Fetch: ", error);
    throw error;
  }
};

export const postData = async ({ endpoint, data = {} }) => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!result) {
      console.log("Response", result);
      throw new Error(result?.error.message || "Something went wrong");
    }

    return result;
  } catch (error) {
    console.error("Cannot Fetch: ", error);
    throw error;
  }
};

export const useAggValues = () => {
  return useQuery({
    queryKey: ["AggValues"],
    queryFn: () => fetchData("agg_values"),
  });
};

export const useAllLists = () => {
  return useQuery({
    queryKey: ["AllLists"],
    queryFn: () => fetchData("all_lists"),
  });
};

export const useProvList = () => {
  return useQuery({
    queryKey: ["ProvLists"],
    queryFn: () => fetchData("provinces"),
  });
};

export const useHotAreas = () => {
  return useQuery({
    queryKey: ["HotAreas"],
    queryFn: () => fetchData("hot_areas"),
  });
};

export const useProperties = () => {
  return useQuery({
    queryKey: ["Properties"],
    queryFn: () => fetchData("properties"),
  });
};

export const useTypeNums = () => {
  return useQuery({
    queryKey: ["TypeNums"],
    queryFn: () => fetchData("lists_type"),
  });
};

export const useTransaction = () => {
  return useQuery({
    queryKey: ["Transact"],
    queryFn: () => fetchData("transactions"),
  });
};

export const usePredict = () => {
  return useMutation({
    mutationFn: ({ endpoint, data }) => {
      console.log("Data sent to mutation:", data);
      return postData({ endpoint, data });
    },
    onSuccess: (response) => {
      console.log("Success", response.prediction);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};
