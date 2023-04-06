import React, { FC } from "react";
import { useFlats } from "./hooks/useFlats";
import { Loader } from "@mantine/core";
import FlatCard from "./FlatCard";
export const FlatsList: FC = () => {
  const { flats, isError, isLoading } = useFlats();
  if (isError) return <h1>Error while fetching flats</h1>;
  if (isLoading) return <Loader size="xl" variant="dots" />;
  return (
    <div className="mt-6 grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-items-center gap-0">
      {flats?.data.map((flat) => (
        <FlatCard flat={flat} key={flat._id} />
      ))}
    </div>
  );
};
