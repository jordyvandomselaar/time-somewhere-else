import React from "react";
import Head from "next/head";
import Box from "./Box";
import { GlobalStyles } from "./styles";

function Layout({ children }) {
  return (
    <>
      <GlobalStyles />
      <Head>
        <title>Time Somewhere Else</title>
      </Head>
      <Box
        top={0}
        right={0}
        bottom={0}
        left={0}
        position="absolute"
        overflow="auto"
        display="grid"
        gridTemplateColumns="200px auto 200px"
        gridTemplateRows="65px auto"
      >
        {children}
      </Box>
    </>
  );
}

Layout.Content = function ({ children }) {
  return (
    <Box gridColumn={["1/4", "2/2"]} gridRow={["2", "2/2"]}>
      {children}
    </Box>
  );
};

export default Layout;
