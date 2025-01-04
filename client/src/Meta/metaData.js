import React from "react";
import { Helmet } from "react-helmet-async";

const metaData = ({ title }) => {
  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
    </Helmet>
  );
};

export default metaData;
