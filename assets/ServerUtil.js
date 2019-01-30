import axios from 'axios'
import Const from './Const'

import querystring from 'querystring'

var http = {
  selfUrl:'http://localhost:3000',

  baseURL: 'http://localhost:8080/front',
  req: axios,
  Const: Const,
  qs(obj) {  //转换格式为请求拼接
    return "?" + querystring.stringify(obj);
  },
  get(url, data, callbackSuccess, callbackError) {
    let params = '';
    if (data != null) {
      params = "?" + querystring.stringify(data);
    }
    console.log(this.baseURL + url + params + " {请求路径}");
    return axios({
      method: 'get',
      url: this.baseURL + url + params,
    })
      .then(res => {
        let root = res.data;
        if (root.code != 0) {
          callbackSuccess(root.data);
          return;
        } else {
          console.log("返回结果失败:" + msg);
          if (callbackError != null) {
            callbackError(root.msg);
          }
          return;
        }
      })
      .catch(error => {
        console.log("请求服务器异常:" + error);
        if (callbackError != null) {
          callbackError("请求服务器异常: " + error.status);
        }
        return;
      });
  },
  post(url, data, callbackSuccess, callbackError) {
    let params;
    if (data != null) {
      params = querystring.stringify(data);
    }
    return axios.post(this.baseURL + url, params)
      .then(res => {
        let root = res.data;
        if (root.code != 0) {
          callbackSuccess(root.data);
          return;
        } else {
          console.log("返回结果失败:" + msg);
          if (callbackError != null) {
            callbackError(root.msg);
          }
          return;
        }
      }).catch(error => {
        console.log("请求服务器异常:" + error);
        if (callbackError != null) {
          callbackError("请求服务器异常: " + error);
        }
      });
  },
  dataUtil: {
    /**
     * 请求最热门的标签API
     * @returns {Promise<any>}
     */
    getTagHot() {
      let self = http;
      return new Promise((resolve, reject) => {
        self.get('/get-tag-hot', null, success => {
          resolve(success);
        }, error => {
          reject(error);
        })
      });
    },
    /**
     * 请求博主信息API
     * @returns {Promise<any>}
     */
    getAdmin() {
      let self = http;
      return new Promise((resolve, reject) => {
        self.get('/get-admin', null, success => {
          resolve(success);
        }, error => {
          reject(error);
        })
      })
    },
    /**
     * 获取首页最热门的文章
     * @param page 请求页数
     * @param size 总数
     * @returns {Promise<any>}
     */
    getArticleNewAll(page, size) {
      let self = http;
      return new Promise((resolve, reject) => {
        self.get('/get-article-new-all', {
          isSplit: true,
          page: page,
          size: size
        }, success => {
          resolve(success);
        }, error => {
          reject(error);
        })
      })
    },
    /**
     * 获取最新的主题推荐API
     * @returns {Promise<any>}
     */
    getHotSubject() {
      let self = http;
      return new Promise((resolve, reject) => {
        self.get('/get-subject-hot', null, success => {
          resolve(success);
        }, error => {
          reject(error);
        })
      })
    },
    /**
     * 通过文章的ID获取文章展示对象
     * @param articleId
     * @returns {Promise<any>}
     */
    getArticleDetail(articleId) {
      let self = http;
      return new Promise((resolve, reject) => {
        self.get('/get-article-detail', {id: articleId}, success => {
          resolve(success);
        }, error => {
          reject(error);
        })
      })
    },
    /**
     * 请求服务器获取热门搜索的API接口
     * @returns {Promise<any>}
     */
    getHotKeyWord() {
      let self = http;
      return new Promise((resolve, reject) => {
        self.get('/get-search-key-count', {size: 10}, success => {
          resolve(success);
        }, error => {
          reject(error);
        })
      })
    },
    getSortAll() {
      let self = http;
      return new Promise((resolve, reject) => {
        self.get('/get-sort-all', null, success => {
          resolve(success);
        }, error => {
          reject(error);
        })
      })
    }
  }
};
export default http
