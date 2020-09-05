import styled, { createGlobalStyle, css } from "styled-components";

export const GlobalStyles = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
\tmargin: 0;
\tpadding: 0;
\tborder: 0;
\tfont-size: 100%;
\tfont: inherit;
\tvertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
\tdisplay: block;
}
body {
\tline-height: 1;
}
ol, ul {
\tlist-style: none;
}
blockquote, q {
\tquotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
\tcontent: '';
\tcontent: none;
}
table {
\tborder-collapse: collapse;
\tborder-spacing: 0;
}`;

export const DayItemWrapper = styled.div`
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  label {
    border: solid 1px #000;
    ${(props) =>
      props.checked &&
      css`
        background: #000;
        color: #fff;
      `};
    padding: 10px;
    display: block;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const Select = styled.select`
  width: 100%;
`;

export const Label = styled.label`
  width: 100%;
`;

export const Input = styled.input`
  width: calc(100% - 2px);
  padding: 0;
  border-width: 1px;
`;

export const Text = styled.p`
  margin: 0;

  ${(props) => {
    if (props.variant === "app")
      return css`
        font-size: 1.3rem;
      `;
  }}
`;
