var drupal = {};
      jsp = {};
      jsp.dom.Text = function () {
        this.insert = function (where) {
          var txt = document.createTextNode(this.url);
          where.appendChild(txt);
        };
      };
      jsp.dom.Link = function () {
        this.insert = function (where) {
          var link = document.createElement('a');
          link.href = this.url;
          link.appendChild(document.createTextNode(this.url));
          where.appendChild(link);
        };
      };
      jsp.dom.Image = function () {
        this.insert = function (where) {
          var im = document.createElement('img');
          im.src = this.url;
          where.appendChild(im);
        };
      };
      jsp.dom.factory = function (type) {
        return new jsp.dom[type];
      }

