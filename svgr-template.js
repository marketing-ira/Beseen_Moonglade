/**
 * SVGR template used by `gatsby-plugin-react-svg`.
 *
 * Goal: avoid `Component.defaultProps = ...` on function components, which
 * React will remove support for in a future major release.
 *
 * This template keeps the usual SVGR-generated component signature (including
 * `title`/`titleId` when present) but does not emit any `defaultProps`.
 */
module.exports = function svgrTemplate(variables, { tpl }) {
  return tpl`
${variables.imports};

const ${variables.componentName} = (${variables.props}) => (
  ${variables.jsx}
);

export default ${variables.componentName};
`
}

