import { endPoints } from './endpoints';
import Emitter from '../events/appEvent';

import * as Request from 'superagent';

class CallServerTask {
  constructor(
    public url: string,
    public method: string,
    public data: any,
    public defer: JQueryDeferred<any>
  ) { }
}

class BaseDAO {
  queue: Array<CallServerTask>;
  constructor() {
    this.queue = new Array<CallServerTask>();
  }

  private callNext() {
    var self = this;
    var task = self.queue[0];

    let r = Request[task.method.toLowerCase()](task.url)
      .set('Expires', '-1')
      .set('Accept', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest')
      .set('Content-Type', 'application/json;charset=UTF-8')
      .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private');
    if (task.method !== 'GET') {
      r.send($.extend({}, task.data));
    }
    r.end(function(err, res) {
      if (err) {
        console.log(err);
      }
      else {
        task.defer.resolve(res.body);
      }
      self.queue.shift();
      if (self.queue.length > 0) {
        self.callNext();
      }
      else if (self.queue.length === 0) {
        
      }
    });
  }

  call(name: string, data: any, parameters?: { [key: string]: string }, urlInputs?: { [key: string]: string }): JQueryPromise<any> {
    let callConf = endPoints[name];

    if (typeof callConf === 'undefined') {
      throw new ReferenceError('Undefined API name.');
    }

    let d = $.Deferred();

    let params = new Array<string>();

    let url = callConf.url;
    // This is costly regarding the space and computation. Use this cautiously
    if (urlInputs) {
      for (var i in urlInputs) {
        if (urlInputs.hasOwnProperty(i)) {
          let r = new RegExp('\{%' + i + '%\}', 'g');
          url = url.replace(r, urlInputs[i]);
        }
      }
    }

    if (parameters) {
      for (var p in parameters) {
        if (parameters.hasOwnProperty(p)) {
          params.push(p + '=' + parameters[p]);
        }
      }

      if (params.length > 0) {
        url += '?' + params.join('&');
      }
    } console.log(url);

    this.queue.push(new CallServerTask(url, callConf.method, data, d));

    if (this.queue.length === 1) {
      
      this.callNext();
    }

    return d.promise();
  }
}

let baseDAOInstance = new BaseDAO();

export const Server = baseDAOInstance;