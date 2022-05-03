export const getOffset = (offsetProp?: any) => {
  const { pa, pv, ph, pt, pr, pb, pl, ma, mv, mh, mt, mr, mb, ml } = offsetProp

  const offsetStyle: any = {
    margin: ma,
    marginVertical: mv,
    marginHorizontal: mh,
    marginTop: mt,
    marginRight: mr,
    marginBottom: mb,
    marginLeft: ml,
    padding: pa,
    paddingVertical: pv,
    paddingHorizontal: ph,
    paddingTop: pt,
    paddingRight: pr,
    paddingBottom: pb,
    paddingLeft: pl,
  }

  return offsetStyle
}
