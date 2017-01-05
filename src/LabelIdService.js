export default class LabelIdService {
  constructor(viewId) {
    this.viewId = viewId;
  }
  getLabelId(sentenceIndex, labelIndex) {
    return this.viewId + "-" + sentenceIndex + "-" + labelIndex;
  }
}
