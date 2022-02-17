

class PageList {
    num = 1;
    size = 50;
    total = 0;
  }
  class PageListResult {
    total = 0;
    datas = null;
  }
  
  class PageSearch {
    search = {
      keyword: null
    };
    pageList = new PageList();
  }
  
  module.exports.PageList = PageList;
  module.exports.PageListResult = PageListResult;
  module.exports.PageSearch = PageSearch;