interface Params {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string;
}

const baseInfo = useBaseInfo();
export default function renderSeo(params: Params) {
  let obj = {} as any;
  if (params.title) {
    if (params.title === baseInfo.title) {
      obj.title = baseInfo.title;
    } else {
      obj.title = params.title + " - " + baseInfo.title;
    }
    obj.ogTitle = params.title;
  }
  if (params.description) {
    obj.description = params.description;
    obj.ogDescription = params.description;
  }
  if (params.image) {
    obj.ogImage = params.image;
  }
  return useSeoMeta(obj);
}
