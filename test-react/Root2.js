const Root2 = ReactElement(() => {
  const ref = useRef()
  const [n, setN] = useState(1)

  useEffect(() => {
    n; 'x'
  }, [n])

  return Div({
    class: 'outer-div',
    key: 'x',
    ref,
    onClick() {},
    x: null,
    style: {
      color: 'blue',
      backgroundColor: 'black',
    },
    bool: true,
    boolx: false,
  }, [
    Div({
      className: 'inner-div',
    }, `${n}`),
    Div({
      dangerouslySetInnerHTML: {
        __html: '<p>dangerously-set</p>'
      },
    }),
  ])
})

export default Root2
