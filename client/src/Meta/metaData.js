import React from "react";
import { Helmet } from "react-helmet-async";

const MetaData = ({ title }) => {
  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
    </Helmet>
  );
};

export default MetaData;
