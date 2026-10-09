const Root1 = ReactElement(() => {
  return Div([
    H1('Test'),
    P(`${script1var1}`),
    P(`${a}`),
    P(b),
    P(`[${c[0]}, ${c[1]}, ${c[2]}]`),
    P(JSON.stringify(d)),
  ])
})

export default Root1
