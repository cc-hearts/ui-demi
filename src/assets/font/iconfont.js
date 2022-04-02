!(function (e) {
  var t,
    n,
    o,
    i,
    c,
    d =
      '<svg><symbol id="icon-sushe" viewBox="0 0 1024 1024"><path d="M869.2 844.1H154.8c-10.4 0-18.8-8.4-18.8-18.8s8.4-18.8 18.8-18.8h12.5v-564c0-34.6 28.1-62.7 62.7-62.7h313.3c34.6 0 62.7 28.1 62.7 62.7v125.3h188c34.6 0 62.7 28.1 62.7 62.7v376h12.5c10.4 0 18.8 8.4 18.8 18.8s-8.4 18.8-18.8 18.8zM342.8 298.9h-87.7v87.7h87.7v-87.7z m0 178.6h-87.7v87.7h87.7v-87.7z m0 178.6h-87.7v87.7h87.7v-87.7z m175.5-357.2h-87.7v87.7h87.7v-87.7z m0 178.6h-87.7v87.7h87.7v-87.7z m0 178.6h-87.7v87.7h87.7v-87.7z m263.2-175.4h-87.7v87.7h87.7v-87.7z m0 175.4h-87.7v87.7h87.7v-87.7z" fill="" ></path></symbol></svg>',
    s = (s = document.getElementsByTagName('script'))[
      s.length - 1
    ].getAttribute('data-injectcss'),
    l = function (e, t) {
      t.parentNode.insertBefore(e, t);
    };
  if (s && !e.__iconfont__svg__cssinject__) {
    e.__iconfont__svg__cssinject__ = !0;
    try {
      document.write(
        '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
      );
    } catch (e) {
      console && console.log(e);
    }
  }
  function h() {
    c || ((c = !0), o());
  }
  function a() {
    try {
      i.documentElement.doScroll('left');
    } catch (e) {
      return void setTimeout(a, 50);
    }
    h();
  }
  (t = function () {
    var e,
      t = document.createElement('div');
    (t.innerHTML = d),
      (d = null),
      (t = t.getElementsByTagName('svg')[0]) &&
        (t.setAttribute('aria-hidden', 'true'),
        (t.style.position = 'absolute'),
        (t.style.width = 0),
        (t.style.height = 0),
        (t.style.overflow = 'hidden'),
        (t = t),
        (e = document.body).firstChild ? l(t, e.firstChild) : e.appendChild(t));
  }),
    document.addEventListener
      ? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
        ? setTimeout(t, 0)
        : ((n = function () {
            document.removeEventListener('DOMContentLoaded', n, !1), t();
          }),
          document.addEventListener('DOMContentLoaded', n, !1))
      : document.attachEvent &&
        ((o = t),
        (i = e.document),
        (c = !1),
        a(),
        (i.onreadystatechange = function () {
          'complete' == i.readyState && ((i.onreadystatechange = null), h());
        }));
})(window);
