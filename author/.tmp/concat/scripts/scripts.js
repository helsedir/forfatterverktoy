(function () {
  'use strict';
  /**
   * usage: <textarea ng-model="content" redactor></textarea>
   *
   *    additional options:
   *      redactor: hash (pass in a redactor options hash)
   *
   */
  var redactorOptions = {};
  angular.module('angular-redactor', []).constant('redactorOptions', redactorOptions).directive('redactor', [
    '$timeout',
    function ($timeout) {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
          var updateModel = function updateModel(value) {
              // $timeout to avoid $digest collision
              $timeout(function () {
                scope.$apply(function () {
                  ngModel.$setViewValue(value);
                });
              });
            }, options = { changeCallback: updateModel }, additionalOptions = attrs.redactor ? scope.$eval(attrs.redactor) : {}, editor, $_element = angular.element(element);
          angular.extend(options, redactorOptions, additionalOptions);
          // put in timeout to avoid $digest collision.  call render() to
          // set the initial value.
          $timeout(function () {
            editor = $_element.redactor(options);
            ngModel.$render();
          });
          ngModel.$render = function () {
            if (angular.isDefined(editor)) {
              $timeout(function () {
                $_element.redactor('code.set', ngModel.$viewValue || '');
              });
            }
          };
        }
      };
    }
  ]);
}());
/*
	Redactor v10.0.2
	Updated: October 12, 2014

	http://imperavi.com/redactor/

	Copyright (c) 2009-2014, Imperavi LLC.
	License: http://imperavi.com/redactor/license/

	Usage: $('#content').redactor();
*/
(function ($) {
  'use strict';
  if (!Function.prototype.bind) {
    Function.prototype.bind = function (scope) {
      var fn = this;
      return function () {
        return fn.apply(scope);
      };
    };
  }
  var uuid = 0;
  var reUrlYoutube = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com\S*[^\w\-\s])([\w\-]{11})(?=[^\w\-]|$)(?![?=&+%\w.\-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;
  var reUrlVimeo = /https?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
  // Plugin
  $.fn.redactor = function (options) {
    var val = [];
    var args = Array.prototype.slice.call(arguments, 1);
    if (typeof options === 'string') {
      this.each(function () {
        var instance = $.data(this, 'redactor');
        var func;
        if (options.search(/\./) != '-1') {
          func = options.split('.');
          if (typeof instance[func[0]] != 'undefined') {
            func = instance[func[0]][func[1]];
          }
        } else {
          func = instance[options];
        }
        if (typeof instance !== 'undefined' && $.isFunction(func)) {
          var methodVal = func.apply(instance, args);
          if (methodVal !== undefined && methodVal !== instance) {
            val.push(methodVal);
          }
        } else {
          $.error('No such method "' + options + '" for Redactor');
        }
      });
    } else {
      this.each(function () {
        $.data(this, 'redactor', {});
        $.data(this, 'redactor', Redactor(this, options));
      });
    }
    if (val.length === 0)
      return this;
    else if (val.length === 1)
      return val[0];
    else
      return val;
  };
  // Initialization
  function Redactor(el, options) {
    return new Redactor.prototype.init(el, options);
  }
  // Functionality
  $.Redactor = Redactor;
  $.Redactor.VERSION = '10.0.2';
  $.Redactor.modules = [
    'core',
    'build',
    'lang',
    'toolbar',
    'button',
    'dropdown',
    'code',
    'clean',
    'tidy',
    'paragraphize',
    'tabifier',
    'focus',
    'placeholder',
    'autosave',
    'buffer',
    'indent',
    'alignment',
    'paste',
    'keydown',
    'keyup',
    'shortcuts',
    'line',
    'list',
    'block',
    'inline',
    'insert',
    'caret',
    'selection',
    'observe',
    'link',
    'image',
    'file',
    'modal',
    'progress',
    'upload',
    'utils'
  ];
  $.Redactor.opts = {
    lang: 'en',
    direction: 'ltr',
    plugins: false,
    focus: false,
    focusEnd: false,
    placeholder: false,
    visual: true,
    tabindex: false,
    minHeight: false,
    maxHeight: false,
    linebreaks: false,
    replaceDivs: true,
    paragraphize: true,
    cleanStyleOnEnter: false,
    enterKey: true,
    cleanOnPaste: true,
    cleanSpaces: true,
    pastePlainText: false,
    autosave: false,
    autosaveName: false,
    autosaveInterval: 60,
    autosaveOnChange: false,
    linkTooltip: true,
    linkProtocol: 'http',
    linkNofollow: false,
    linkSize: 50,
    imageEditable: true,
    imageLink: true,
    imagePosition: true,
    imageFloatMargin: '10px',
    imageResizable: true,
    imageUpload: false,
    imageUploadParam: 'file',
    uploadImageField: false,
    dragImageUpload: true,
    fileUpload: false,
    fileUploadParam: 'file',
    dragFileUpload: true,
    s3: false,
    convertLinks: true,
    convertUrlLinks: true,
    convertImageLinks: true,
    convertVideoLinks: true,
    preSpaces: 4,
    tabAsSpaces: false,
    tabFocus: true,
    scrollTarget: false,
    toolbar: true,
    toolbarFixed: true,
    toolbarFixedTarget: document,
    toolbarFixedTopOffset: 0,
    toolbarExternal: false,
    toolbarOverflow: false,
    buttonSource: false,
    buttons: [
      'html',
      'formatting',
      'bold',
      'italic',
      'deleted',
      'unorderedlist',
      'orderedlist',
      'outdent',
      'indent',
      'image',
      'file',
      'link',
      'alignment',
      'horizontalrule'
    ],
    buttonsHide: [],
    buttonsHideOnMobile: [],
    formatting: [
      'p',
      'blockquote',
      'pre',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6'
    ],
    formattingAdd: false,
    tabifier: true,
    deniedTags: [
      'html',
      'head',
      'link',
      'body',
      'meta',
      'script',
      'style',
      'applet'
    ],
    allowedTags: false,
    removeComments: false,
    replaceTags: [[
        'strike',
        'del'
      ]],
    replaceStyles: [
      [
        'font-weight:\\s?bold',
        'strong'
      ],
      [
        'font-style:\\s?italic',
        'em'
      ],
      [
        'text-decoration:\\s?underline',
        'u'
      ],
      [
        'text-decoration:\\s?line-through',
        'del'
      ]
    ],
    removeDataAttr: false,
    removeAttr: false,
    allowedAttr: false,
    removeWithoutAttr: ['span'],
    removeEmpty: ['p'],
    activeButtons: [
      'deleted',
      'italic',
      'bold',
      'underline',
      'unorderedlist',
      'orderedlist',
      'alignleft',
      'aligncenter',
      'alignright',
      'justify'
    ],
    activeButtonsStates: {
      b: 'bold',
      strong: 'bold',
      i: 'italic',
      em: 'italic',
      del: 'deleted',
      strike: 'deleted',
      ul: 'unorderedlist',
      ol: 'orderedlist',
      u: 'underline'
    },
    shortcuts: {
      'ctrl+shift+m, meta+shift+m': { func: 'inline.removeFormat' },
      'ctrl+b, meta+b': {
        func: 'inline.format',
        params: ['bold']
      },
      'ctrl+i, meta+i': {
        func: 'inline.format',
        params: ['italic']
      },
      'ctrl+h, meta+h': {
        func: 'inline.format',
        params: ['superscript']
      },
      'ctrl+l, meta+l': {
        func: 'inline.format',
        params: ['subscript']
      },
      'ctrl+k, meta+k': { func: 'link.show' },
      'ctrl+shift+7': {
        func: 'list.toggle',
        params: ['orderedlist']
      },
      'ctrl+shift+8': {
        func: 'list.toggle',
        params: ['unorderedlist']
      }
    },
    shortcutsAdd: false,
    buffer: [],
    rebuffer: [],
    emptyHtml: '<p>&#x200b;</p>',
    invisibleSpace: '&#x200b;',
    imageTypes: [
      'image/png',
      'image/jpeg',
      'image/gif'
    ],
    indentValue: 20,
    verifiedTags: [
      'a',
      'img',
      'b',
      'strong',
      'sub',
      'sup',
      'i',
      'em',
      'u',
      'small',
      'strike',
      'del',
      'cite',
      'ul',
      'ol',
      'li'
    ],
    inlineTags: [
      'strong',
      'b',
      'u',
      'em',
      'i',
      'code',
      'del',
      'ins',
      'samp',
      'kbd',
      'sup',
      'sub',
      'mark',
      'var',
      'cite',
      'small'
    ],
    alignmentTags: [
      'P',
      'H1',
      'H2',
      'H3',
      'H4',
      'H5',
      'H6',
      'DL',
      'DT',
      'DD',
      'DIV',
      'TD',
      'BLOCKQUOTE',
      'OUTPUT',
      'FIGCAPTION',
      'ADDRESS',
      'SECTION',
      'HEADER',
      'FOOTER',
      'ASIDE',
      'ARTICLE'
    ],
    blockLevelElements: [
      'PRE',
      'UL',
      'OL',
      'LI'
    ],
    langs: {
      en: {
        html: 'HTML',
        video: 'Insert Video',
        image: 'Insert Image',
        table: 'Table',
        link: 'Link',
        link_insert: 'Insert link',
        link_edit: 'Edit link',
        unlink: 'Unlink',
        formatting: 'Formatting',
        paragraph: 'Normal text',
        quote: 'Quote',
        code: 'Code',
        header1: 'Header 1',
        header2: 'Header 2',
        header3: 'Header 3',
        header4: 'Header 4',
        header5: 'Header 5',
        bold: 'Bold',
        italic: 'Italic',
        fontcolor: 'Font Color',
        backcolor: 'Back Color',
        unorderedlist: 'Unordered List',
        orderedlist: 'Ordered List',
        outdent: 'Outdent',
        indent: 'Indent',
        cancel: 'Cancel',
        insert: 'Insert',
        save: 'Save',
        _delete: 'Delete',
        insert_table: 'Insert Table',
        insert_row_above: 'Add Row Above',
        insert_row_below: 'Add Row Below',
        insert_column_left: 'Add Column Left',
        insert_column_right: 'Add Column Right',
        delete_column: 'Delete Column',
        delete_row: 'Delete Row',
        delete_table: 'Delete Table',
        rows: 'Rows',
        columns: 'Columns',
        add_head: 'Add Head',
        delete_head: 'Delete Head',
        title: 'Title',
        image_position: 'Position',
        none: 'None',
        left: 'Left',
        right: 'Right',
        center: 'Center',
        image_web_link: 'Image Web Link',
        text: 'Text',
        mailto: 'Email',
        web: 'URL',
        video_html_code: 'Video Embed Code or Youtube/Vimeo Link',
        file: 'Insert File',
        upload: 'Upload',
        download: 'Download',
        choose: 'Choose',
        or_choose: 'Or choose',
        drop_file_here: 'Drop file here',
        align_left: 'Align text to the left',
        align_center: 'Center text',
        align_right: 'Align text to the right',
        align_justify: 'Justify text',
        horizontalrule: 'Insert Horizontal Rule',
        deleted: 'Deleted',
        anchor: 'Anchor',
        link_new_tab: 'Open link in new tab',
        underline: 'Underline',
        alignment: 'Alignment',
        filename: 'Name (optional)',
        edit: 'Edit'
      }
    }
  };
  // Functionality
  Redactor.fn = $.Redactor.prototype = {
    keyCode: {
      BACKSPACE: 8,
      DELETE: 46,
      DOWN: 40,
      ENTER: 13,
      SPACE: 32,
      ESC: 27,
      TAB: 9,
      CTRL: 17,
      META: 91,
      SHIFT: 16,
      ALT: 18,
      LEFT: 37,
      LEFT_WIN: 91
    },
    init: function (el, options) {
      this.$element = $(el);
      this.uuid = uuid++;
      // if paste event detected = true
      this.rtePaste = false;
      this.$pasteBox = false;
      this.loadOptions(options);
      this.loadModules();
      // formatting storage
      this.formatting = {};
      // block level tags
      $.merge(this.opts.blockLevelElements, this.opts.alignmentTags);
      this.reIsBlock = new RegExp('^(' + this.opts.blockLevelElements.join('|') + ')$', 'i');
      // setup allowed and denied tags
      this.tidy.setupAllowed();
      // load lang
      this.lang.load();
      // extend shortcuts
      $.extend(this.opts.shortcuts, this.opts.shortcutsAdd);
      // start callback
      this.core.setCallback('start');
      // build
      this.start = true;
      this.build.run();
    },
    loadOptions: function (options) {
      this.opts = $.extend({}, $.extend(true, {}, $.Redactor.opts), this.$element.data(), options);
    },
    getModuleMethods: function (object) {
      return Object.getOwnPropertyNames(object).filter(function (property) {
        return typeof object[property] == 'function';
      });
    },
    loadModules: function () {
      var len = $.Redactor.modules.length;
      for (var i = 0; i < len; i++) {
        this.bindModuleMethods($.Redactor.modules[i]);
      }
    },
    bindModuleMethods: function (module) {
      if (typeof this[module] == 'undefined')
        return;
      // init module
      this[module] = this[module]();
      var methods = this.getModuleMethods(this[module]);
      var len = methods.length;
      // bind methods
      for (var z = 0; z < len; z++) {
        this[module][methods[z]] = this[module][methods[z]].bind(this);
      }
    },
    core: function () {
      return {
        getObject: function () {
          return $.extend({}, this);
        },
        getEditor: function () {
          return this.$editor;
        },
        getBox: function () {
          return this.$box;
        },
        getElement: function () {
          return this.$element;
        },
        getTextarea: function () {
          return this.$textarea;
        },
        getToolbar: function () {
          return this.$toolbar ? this.$toolbar : false;
        },
        addEvent: function (name) {
          this.core.event = name;
        },
        getEvent: function () {
          return this.core.event;
        },
        setCallback: function (type, e, data) {
          var callback = this.opts[type + 'Callback'];
          if ($.isFunction(callback)) {
            return typeof data == 'undefined' ? callback.call(this, e) : callback.call(this, e, data);
          } else {
            return typeof data == 'undefined' ? e : data;
          }
        },
        destroy: function () {
          this.core.setCallback('destroy');
          // off events and remove data
          this.$element.off('.redactor').removeData('redactor');
          this.$editor.off('.redactor');
          // common
          this.$editor.removeClass('redactor-editor redactor-linebreaks redactor-placeholder');
          this.$editor.removeAttr('contenteditable');
          var html = this.code.get();
          if (this.build.isTextarea()) {
            this.$box.after(this.$element);
            this.$box.remove();
            this.$element.val(html).show();
          } else {
            this.$box.after(this.$editor);
            this.$box.remove();
            this.$element.html(html).show();
          }
          // paste box
          if (this.$pasteBox)
            this.$pasteBox.remove();
          // modal
          if (this.$modalBox)
            this.$modalBox.remove();
          if (this.$modalOverlay)
            this.$modalOverlay.remove();
          // buttons tooltip
          $('.redactor-toolbar-tooltip').remove();
          // autosave
          clearInterval(this.autosaveInterval);
        }
      };
    },
    build: function () {
      return {
        run: function () {
          this.build.createContainerBox();
          this.build.loadContent();
          this.build.loadEditor();
          this.build.enableEditor();
          this.build.setCodeAndCall();
        },
        isTextarea: function () {
          return this.$element[0].tagName === 'TEXTAREA';
        },
        createContainerBox: function () {
          this.$box = $('<div class="redactor-box" />');
        },
        createTextarea: function () {
          this.$textarea = $('<textarea />').attr('name', this.build.getTextareaName());
        },
        getTextareaName: function () {
          var name = this.$element.attr('id');
          if (typeof name == 'undefined') {
            name = 'content-' + this.uuid;
          }
          return name;
        },
        loadContent: function () {
          var func = this.build.isTextarea() ? 'val' : 'html';
          this.content = $.trim(this.$element[func]());
        },
        enableEditor: function () {
          this.$editor.attr({
            'contenteditable': true,
            'dir': this.opts.direction
          });
        },
        loadEditor: function () {
          var func = this.build.isTextarea() ? 'fromTextarea' : 'fromElement';
          this.build[func]();
        },
        fromTextarea: function () {
          this.$editor = $('<div />');
          this.$textarea = this.$element;
          this.$box.insertAfter(this.$element).append(this.$editor).append(this.$element);
          this.$editor.addClass('redactor-editor');
          this.$element.hide();
        },
        fromElement: function () {
          this.$editor = this.$element;
          this.build.createTextarea();
          this.$box.insertAfter(this.$editor).append(this.$editor).append(this.$textarea);
          this.$editor.addClass('redactor-editor');
          this.$textarea.hide();
        },
        setCodeAndCall: function () {
          // set code
          this.code.set(this.content);
          this.build.setOptions();
          this.build.callEditor();
          // code mode
          if (!this.opts.visual) {
            setTimeout($.proxy(this.code.showCode, this), 200);
          }
        },
        callEditor: function () {
          this.build.disableMozillaEditing();
          this.build.setEvents();
          this.build.setHelpers();
          // load toolbar
          if (this.opts.toolbar) {
            this.opts.toolbar = this.toolbar.init();
            this.toolbar.build();
          }
          // modal templates init
          this.modal.loadTemplates();
          // plugins
          this.build.plugins();
          // observers
          setTimeout($.proxy(this.observe.load, this), 4);
          // init callback
          this.core.setCallback('init');
        },
        setOptions: function () {
          // textarea direction
          $(this.$textarea).attr('dir', this.opts.direction);
          if (this.opts.linebreaks)
            this.$editor.addClass('redactor-linebreaks');
          if (this.opts.tabindex)
            this.$editor.attr('tabindex', this.opts.tabindex);
          if (this.opts.minHeight)
            this.$editor.css('minHeight', this.opts.minHeight);
          if (this.opts.maxHeight)
            this.$editor.css('maxHeight', this.opts.maxHeight);
        },
        setEvents: function () {
          // drop
          this.$editor.on('drop.redactor', $.proxy(function (e) {
            e = e.originalEvent || e;
            if (window.FormData === undefined || !e.dataTransfer)
              return true;
            var length = e.dataTransfer.files.length;
            if (length === 0)
              return true;
            else {
              e.preventDefault();
              if (this.opts.dragImageUpload || this.opts.dragFileUpload) {
                var files = e.dataTransfer.files;
                this.upload.directUpload(files[0], e);
              }
            }
            setTimeout($.proxy(this.clean.clearUnverified, this), 1);
            this.core.setCallback('drop', e);
          }, this));
          // click
          this.$editor.on('click.redactor', $.proxy(function (e) {
            var type = 'click';
            if (this.core.getEvent() == 'click' || this.core.getEvent() == 'arrow') {
              type = false;
            }
            this.core.addEvent(type);
            this.utils.disableSelectAll();
            this.core.setCallback('click', e);
          }, this));
          // paste
          this.$editor.on('paste.redactor', $.proxy(this.paste.init, this));
          // keydown
          this.$editor.on('keydown.redactor', $.proxy(this.keydown.init, this));
          // keyup
          this.$editor.on('keyup.redactor', $.proxy(this.keyup.init, this));
          // textarea keydown
          if ($.isFunction(this.opts.codeKeydownCallback)) {
            this.$textarea.on('keydown.redactor-textarea', $.proxy(this.opts.codeKeydownCallback, this));
          }
          // textarea keyup
          if ($.isFunction(this.opts.codeKeyupCallback)) {
            this.$textarea.on('keyup.redactor-textarea', $.proxy(this.opts.codeKeyupCallback, this));
          }
          // focus
          if ($.isFunction(this.opts.focusCallback)) {
            this.$editor.on('focus.redactor', $.proxy(this.opts.focusCallback, this));
          }
          var clickedElement;
          $(document).on('mousedown', function (e) {
            clickedElement = $(e.target);
          });
          // blur
          this.$editor.on('blur.redactor', $.proxy(function (e) {
            if (this.rtePaste)
              return;
            var $el = $(clickedElement);
            if (!$el.hasClass('redactor-toolbar, redactor-dropdown') && !$el.is('#redactor-modal') && $el.parents('.redactor-toolbar, .redactor-dropdown, #redactor-modal').size() === 0) {
              this.utils.disableSelectAll();
              if ($.isFunction(this.opts.blurCallback))
                this.core.setCallback('blur', e);
            }
          }, this));
        },
        setHelpers: function () {
          // autosave
          this.autosave.enable();
          // placeholder
          this.placeholder.enable();
          // focus
          if (this.opts.focus)
            setTimeout($.proxy(this.focus.setStart, this), 100);
          if (this.opts.focusEnd)
            setTimeout($.proxy(this.focus.setEnd, this), 100);
        },
        plugins: function () {
          if (!this.opts.plugins)
            return;
          if (!RedactorPlugins)
            return;
          $.each(this.opts.plugins, $.proxy(function (i, s) {
            if (RedactorPlugins[s]) {
              if (!$.isFunction(RedactorPlugins[s]))
                return;
              this[s] = RedactorPlugins[s]();
              var methods = this.getModuleMethods(this[s]);
              var len = methods.length;
              // bind methods
              for (var z = 0; z < len; z++) {
                this[s][methods[z]] = this[s][methods[z]].bind(this);
              }
              if ($.isFunction(this[s].init))
                this[s].init();
            }
          }, this));
        },
        disableMozillaEditing: function () {
          if (!this.utils.browser('mozilla'))
            return;
          // FF fix
          try {
            document.execCommand('enableObjectResizing', false, false);
            document.execCommand('enableInlineTableEditing', false, false);
          } catch (e) {
          }
        }
      };
    },
    lang: function () {
      return {
        load: function () {
          this.opts.curLang = this.opts.langs[this.opts.lang];
        },
        get: function (name) {
          return typeof this.opts.curLang[name] != 'undefined' ? this.opts.curLang[name] : '';
        }
      };
    },
    toolbar: function () {
      return {
        init: function () {
          return {
            html: {
              title: this.lang.get('html'),
              func: 'code.toggle'
            },
            formatting: {
              title: this.lang.get('formatting'),
              dropdown: {
                p: {
                  title: this.lang.get('paragraph'),
                  func: 'block.format'
                },
                blockquote: {
                  title: this.lang.get('quote'),
                  func: 'block.format'
                },
                pre: {
                  title: this.lang.get('code'),
                  func: 'block.format'
                },
                h1: {
                  title: this.lang.get('header1'),
                  func: 'block.format'
                },
                h2: {
                  title: this.lang.get('header2'),
                  func: 'block.format'
                },
                h3: {
                  title: this.lang.get('header3'),
                  func: 'block.format'
                },
                h4: {
                  title: this.lang.get('header4'),
                  func: 'block.format'
                },
                h5: {
                  title: this.lang.get('header5'),
                  func: 'block.format'
                }
              }
            },
            bold: {
              title: this.lang.get('bold'),
              func: 'inline.format'
            },
            italic: {
              title: this.lang.get('italic'),
              func: 'inline.format'
            },
            deleted: {
              title: this.lang.get('deleted'),
              func: 'inline.format'
            },
            underline: {
              title: this.lang.get('underline'),
              func: 'inline.format'
            },
            unorderedlist: {
              title: '&bull; ' + this.lang.get('unorderedlist'),
              func: 'list.toggle'
            },
            orderedlist: {
              title: '1. ' + this.lang.get('orderedlist'),
              func: 'list.toggle'
            },
            outdent: {
              title: '< ' + this.lang.get('outdent'),
              func: 'indent.decrease'
            },
            indent: {
              title: '> ' + this.lang.get('indent'),
              func: 'indent.increase'
            },
            image: {
              title: this.lang.get('image'),
              func: 'image.show'
            },
            file: {
              title: this.lang.get('file'),
              func: 'file.show'
            },
            link: {
              title: this.lang.get('link'),
              dropdown: {
                link: {
                  title: this.lang.get('link_insert'),
                  func: 'link.show'
                },
                unlink: {
                  title: this.lang.get('unlink'),
                  func: 'link.unlink'
                }
              }
            },
            alignment: {
              title: this.lang.get('alignment'),
              dropdown: {
                left: {
                  title: this.lang.get('align_left'),
                  func: 'alignment.left'
                },
                center: {
                  title: this.lang.get('align_center'),
                  func: 'alignment.center'
                },
                right: {
                  title: this.lang.get('align_right'),
                  func: 'alignment.right'
                },
                justify: {
                  title: this.lang.get('align_justify'),
                  func: 'alignment.justify'
                }
              }
            },
            horizontalrule: {
              title: this.lang.get('horizontalrule'),
              func: 'line.insert'
            }
          };
        },
        build: function () {
          this.toolbar.hideButtons();
          this.toolbar.hideButtonsOnMobile();
          this.toolbar.isButtonSourceNeeded();
          if (this.opts.buttons.length === 0)
            return;
          this.$toolbar = this.toolbar.createContainer();
          this.toolbar.setOverflow();
          this.toolbar.append();
          this.toolbar.setFormattingTags();
          this.toolbar.loadButtons();
          this.toolbar.setTabindex();
          this.toolbar.setFixed();
          // buttons response
          if (this.opts.activeButtons) {
            this.$editor.on('mouseup.redactor keyup.redactor focus.redactor', $.proxy(this.observe.buttons, this));
          }
        },
        createContainer: function () {
          return $('<ul>').addClass('redactor-toolbar').attr('id', 'redactor-toolbar-' + this.uuid);
        },
        setFormattingTags: function () {
          $.each(this.opts.toolbar.formatting.dropdown, $.proxy(function (i, s) {
            if ($.inArray(i, this.opts.formatting) == -1)
              delete this.opts.toolbar.formatting.dropdown[i];
          }, this));
        },
        loadButtons: function () {
          $.each(this.opts.buttons, $.proxy(function (i, btnName) {
            if (!this.opts.toolbar[btnName])
              return;
            if (this.opts.fileUpload === false && btnName === 'file')
              return true;
            if (this.opts.imageUpload === false && this.opts.s3 === false && btnName === 'image')
              return true;
            var btnObject = this.opts.toolbar[btnName];
            this.$toolbar.append($('<li>').append(this.button.build(btnName, btnObject)));
          }, this));
        },
        append: function () {
          if (this.opts.toolbarExternal) {
            this.$toolbar.addClass('redactor-toolbar-external');
            $(this.opts.toolbarExternal).html(this.$toolbar);
          } else {
            this.$box.prepend(this.$toolbar);
          }
        },
        setFixed: function () {
          if (this.utils.isMobile())
            return;
          if (this.opts.toolbarExternal)
            return;
          if (!this.opts.toolbarFixed)
            return;
          this.toolbar.observeScroll();
          $(this.opts.toolbarFixedTarget).on('scroll.redactor', $.proxy(this.toolbar.observeScroll, this));
        },
        setTabindex: function () {
          this.$toolbar.find('a').attr('tabindex', '-1');
        },
        setOverflow: function () {
          if (this.utils.isMobile() && this.opts.toolbarOverflow) {
            this.$toolbar.addClass('redactor-toolbar-overflow');
          }
        },
        isButtonSourceNeeded: function () {
          if (this.opts.buttonSource)
            return;
          var index = this.opts.buttons.indexOf('html');
          if (index !== -1) {
            this.opts.buttons.splice(index, 1);
          }
        },
        hideButtons: function () {
          if (this.opts.buttonsHide.length === 0)
            return;
          $.each(this.opts.buttonsHide, $.proxy(function (i, s) {
            var index = this.opts.buttons.indexOf(s);
            this.opts.buttons.splice(index, 1);
          }, this));
        },
        hideButtonsOnMobile: function () {
          if (!this.utils.isMobile() && this.opts.buttonsHideOnMobile.length === 0)
            return;
          $.each(this.opts.buttonsHideOnMobile, $.proxy(function (i, s) {
            var index = this.opts.buttons.indexOf(s);
            this.opts.buttons.splice(index, 1);
          }, this));
        },
        observeScroll: function () {
          var scrollTop = $(this.opts.toolbarFixedTarget).scrollTop();
          var boxTop = 1;
          if (this.opts.toolbarFixedTarget === document) {
            boxTop = this.$box.offset().top;
          }
          if (scrollTop > boxTop) {
            this.toolbar.observeScrollEnable(scrollTop, boxTop);
          } else {
            this.toolbar.observeScrollDisable();
          }
        },
        observeScrollEnable: function (scrollTop, boxTop) {
          var top = this.opts.toolbarFixedTopOffset + scrollTop - boxTop;
          var left = 0;
          var end = boxTop + this.$box.height() + 30;
          var width = this.$box.innerWidth();
          this.$toolbar.addClass('toolbar-fixed-box');
          this.$toolbar.css({
            position: 'absolute',
            width: width,
            top: top + 'px',
            left: left
          });
          this.toolbar.setDropdownsFixed();
          this.$toolbar.css('visibility', scrollTop < end ? 'visible' : 'hidden');
        },
        observeScrollDisable: function () {
          this.$toolbar.css({
            position: 'relative',
            width: 'auto',
            top: 0,
            left: 0,
            visibility: 'visible'
          });
          this.toolbar.unsetDropdownsFixed();
          this.$toolbar.removeClass('toolbar-fixed-box');
        },
        setDropdownsFixed: function () {
          var self = this;
          $('.redactor-dropdown').each(function () {
            $(this).css({
              position: 'fixed',
              top: self.$toolbar.innerHeight() + self.opts.toolbarFixedTopOffset
            });
          });
        },
        unsetDropdownsFixed: function () {
          var self = this;
          $('.redactor-dropdown').each(function () {
            var top = self.$toolbar.innerHeight() + self.$toolbar.offset().top + 'px';
            $(this).css({
              position: 'absolute',
              top: top
            });
          });
        }
      };
    },
    button: function () {
      return {
        build: function (btnName, btnObject) {
          var $button = $('<a href="#" class="re-icon re-' + btnName + '" rel="' + btnName + '" />');
          if (btnObject.func || btnObject.command || btnObject.dropdown) {
            $button.on('touchstart click', $.proxy(function (e) {
              if ($button.hasClass('redactor-button-disabled'))
                return false;
              var type = 'func';
              var callback = btnObject.func;
              if (btnObject.command) {
                type = 'command';
                callback = btnObject.command;
              } else if (btnObject.dropdown) {
                type = 'dropdown';
                callback = false;
              }
              this.button.onClick(e, btnName, type, callback);
            }, this));
          }
          // dropdown
          if (btnObject.dropdown) {
            var $dropdown = $('<div class="redactor-dropdown redactor-dropdown-box-' + btnName + '" style="display: none;">');
            $button.data('dropdown', $dropdown);
            this.dropdown.build(btnName, $dropdown, btnObject.dropdown);
          }
          // tooltip
          if (this.utils.isDesktop()) {
            this.button.createTooltip($button, btnName, btnObject.title);
          }
          return $button;
        },
        createTooltip: function ($button, name, title) {
          var $tooltip = $('<span>').addClass('redactor-toolbar-tooltip redactor-toolbar-tooltip-' + name).hide().html(title);
          $tooltip.appendTo('body');
          $button.on('mouseover', function () {
            if ($(this).hasClass('redactor-button-disabled'))
              return;
            var pos = $button.offset();
            var height = $button.innerHeight();
            var width = $button.innerWidth();
            $tooltip.show();
            $tooltip.css({
              top: pos.top + height + 'px',
              left: pos.left + width / 2 - $tooltip.innerWidth() / 2 + 'px'
            });
          });
          $button.on('mouseout', function () {
            $tooltip.hide();
          });
        },
        onClick: function (e, btnName, type, callback) {
          e.preventDefault();
          if (this.utils.browser('msie'))
            e.returnValue = false;
          if (type == 'command') {
            this.inline.format(callback);
          } else if (type == 'dropdown') {
            this.dropdown.show(e, btnName);
          } else {
            var func;
            if ($.isFunction(callback)) {
              callback.call(this, btnName);
              this.observe.buttons(e, btnName);
            } else if (callback.search(/\./) != '-1') {
              func = callback.split('.');
              if (typeof this[func[0]] != 'undefined') {
                this[func[0]][func[1]](btnName);
                this.observe.buttons(e, btnName);
              }
            } else {
              this[callback](btnName);
              this.observe.buttons(e, btnName);
            }
          }
        },
        get: function (key) {
          return this.$toolbar.find('a.re-' + key);
        },
        setActive: function (key) {
          this.button.get(key).addClass('redactor-act');
        },
        setInactive: function (key) {
          this.button.get(key).removeClass('redactor-act');
        },
        setInactiveAll: function (key) {
          if (typeof key == 'undefined') {
            this.$toolbar.find('a.re-icon').removeClass('redactor-act');
          } else {
            this.$toolbar.find('a.re-icon').not('.re-' + key).removeClass('redactor-act');
          }
        },
        setActiveInVisual: function () {
          this.$toolbar.find('a.re-icon').not('a.re-html').removeClass('redactor-button-disabled');
        },
        setInactiveInCode: function () {
          this.$toolbar.find('a.re-icon').not('a.re-html').addClass('redactor-button-disabled');
        },
        changeIcon: function (key, classname) {
          this.button.get(key).addClass('re-' + classname);
        },
        removeIcon: function (key, classname) {
          this.button.get(key).removeClass('re-' + classname);
        },
        setAwesome: function (key, name) {
          var $button = this.button.get(key);
          $button.removeClass('redactor-btn-image').addClass('fa-redactor-btn');
          $button.html('<i class="fa ' + name + '"></i>');
        },
        addCallback: function ($btn, callback) {
          var type = callback == 'dropdown' ? 'dropdown' : 'func';
          var key = $btn.attr('rel');
          $btn.on('touchstart click', $.proxy(function (e) {
            if ($btn.hasClass('redactor-button-disabled'))
              return false;
            this.button.onClick(e, key, type, callback);
          }, this));
        },
        addDropdown: function ($btn, dropdown) {
          var key = $btn.attr('rel');
          this.button.addCallback($btn, 'dropdown');
          var $dropdown = $('<div class="redactor-dropdown redactor-dropdown-box-' + key + '" style="display: none;">');
          $btn.data('dropdown', $dropdown);
          if (dropdown) {
            this.dropdown.build(key, $dropdown, dropdown);
          }
          return $dropdown;
        },
        add: function (key, title) {
          if (!this.opts.toolbar)
            return;
          var btn = this.button.build(key, { title: title });
          btn.addClass('redactor-btn-image');
          this.$toolbar.append($('<li>').append(btn));
          return btn;
        },
        addFirst: function (key, title) {
          if (!this.opts.toolbar)
            return;
          var btn = this.button.build(key, { title: title });
          this.$toolbar.prepend($('<li>').append(btn));
          return btn;
        },
        addAfter: function (afterkey, key, title) {
          if (!this.opts.toolbar)
            return;
          var btn = this.button.build(key, { title: title });
          var $btn = this.button.get(afterkey);
          if ($btn.size() !== 0)
            $btn.parent().after($('<li>').append(btn));
          else
            this.$toolbar.append($('<li>').append(btn));
          return btn;
        },
        addBefore: function (beforekey, key, title) {
          if (!this.opts.toolbar)
            return;
          var btn = this.button.build(key, { title: title });
          var $btn = this.button.get(beforekey);
          if ($btn.size() !== 0)
            $btn.parent().before($('<li>').append(btn));
          else
            this.$toolbar.append($('<li>').append(btn));
          return btn;
        },
        remove: function (key) {
          this.button.get(key).remove();
        }
      };
    },
    dropdown: function () {
      return {
        build: function (name, $dropdown, dropdownObject) {
          if (name == 'formatting' && this.opts.formattingAdd) {
            $.each(this.opts.formattingAdd, $.proxy(function (i, s) {
              var name = s.tag;
              if (typeof s.class != 'undefined') {
                name = name + '-' + s.class;
              }
              s.type = this.utils.isBlockTag(s.tag) ? 'block' : 'inline';
              var func = s.type == 'inline' ? 'inline.formatting' : 'block.formatting';
              if (this.opts.linebreaks && s.type == 'block' && s.tag == 'p')
                return;
              this.formatting[name] = {
                tag: s.tag,
                style: s.style,
                'class': s.class,
                attr: s.attr,
                data: s.data
              };
              dropdownObject[name] = {
                func: func,
                title: s.title
              };
            }, this));
          }
          $.each(dropdownObject, $.proxy(function (btnName, btnObject) {
            var $item = $('<a href="#" class="redactor-dropdown-' + btnName + '">' + btnObject.title + '</a>');
            if (name == 'formatting')
              $item.addClass('redactor-formatting-' + btnName);
            $item.on('click', $.proxy(function (e) {
              var type = 'func';
              var callback = btnObject.func;
              if (btnObject.command) {
                type = 'command';
                callback = btnObject.command;
              } else if (btnObject.dropdown) {
                type = 'dropdown';
                callback = btnObject.dropdown;
              }
              this.button.onClick(e, btnName, type, callback);
            }, this));
            $dropdown.append($item);
          }, this));
        },
        show: function (e, key) {
          if (!this.opts.visual) {
            e.preventDefault();
            return false;
          }
          var $button = this.button.get(key);
          // Always re-append it to the end of <body> so it always has the highest sub-z-index.
          var $dropdown = $button.data('dropdown').appendTo(document.body);
          if ($button.hasClass('dropact')) {
            this.dropdown.hideAll();
          } else {
            this.dropdown.hideAll();
            this.core.setCallback('dropdownShow', {
              dropdown: $dropdown,
              key: key,
              button: $button
            });
            this.button.setActive(key);
            $button.addClass('dropact');
            var keyPosition = $button.offset();
            // fix right placement
            var dropdownWidth = $dropdown.width();
            if (keyPosition.left + dropdownWidth > $(document).width()) {
              keyPosition.left -= dropdownWidth;
            }
            var left = keyPosition.left + 'px';
            if (this.$toolbar.hasClass('toolbar-fixed-box')) {
              $dropdown.css({
                position: 'fixed',
                left: left,
                top: this.$toolbar.innerHeight() + this.opts.toolbarFixedTopOffset
              }).show();
            } else {
              var top = $button.innerHeight() + keyPosition.top + 'px';
              $dropdown.css({
                position: 'absolute',
                left: left,
                top: top
              }).show();
            }
            this.core.setCallback('dropdownShown', {
              dropdown: $dropdown,
              key: key,
              button: $button
            });
          }
          $(document).one('click', $.proxy(this.dropdown.hide, this));
          this.$editor.one('click', $.proxy(this.dropdown.hide, this));
          $dropdown.on('mouseover', function () {
            $('html').css('overflow', 'hidden');
          });
          $dropdown.on('mouseout', function () {
            $('html').css('overflow', '');
          });
          e.stopPropagation();
        },
        hideAll: function () {
          this.$toolbar.find('a.dropact').removeClass('redactor-act').removeClass('dropact');
          $('.redactor-dropdown').hide();
          this.core.setCallback('dropdownHide');
        },
        hide: function (e) {
          var $dropdown = $(e.target);
          if (!$dropdown.hasClass('dropact')) {
            $dropdown.removeClass('dropact');
            this.dropdown.hideAll();
          }
        }
      };
    },
    code: function () {
      return {
        set: function (html) {
          html = $.trim(html.toString());
          // clean
          html = this.clean.onSet(html);
          this.$editor.html(html);
          this.code.sync();
          setTimeout($.proxy(this.buffer.add, this), 15);
          if (this.start === false)
            this.observe.load();
        },
        get: function () {
          var code = this.$textarea.val();
          // indent code
          code = this.tabifier.get(code);
          return code;
        },
        sync: function () {
          setTimeout($.proxy(this.code.startSync, this), 10);
        },
        startSync: function () {
          var html = this.$editor.html();
          // is there a need to synchronize
          if (this.code.syncCode && this.code.syncCode == html) {
            // do not sync
            return;
          }
          // save code
          this.code.syncCode = html;
          // before clean callback
          html = this.core.setCallback('syncBefore', html);
          // clean
          html = this.clean.onSync(html);
          // set code
          this.$textarea.val(html);
          // after sync callback
          this.core.setCallback('sync', html);
          if (this.start === false) {
            this.core.setCallback('change', html);
          }
          this.start = false;
          // autosave on change
          this.autosave.onChange();
        },
        toggle: function () {
          if (this.opts.visual) {
            this.code.showCode();
          } else {
            this.code.showVisual();
          }
        },
        showCode: function () {
          this.code.offset = this.caret.getOffset();
          var scroll = $(window).scrollTop();
          var height = this.$editor.innerHeight();
          this.$editor.hide();
          var html = this.$textarea.val();
          this.modified = this.clean.removeSpaces(html);
          // indent code
          html = this.tabifier.get(html);
          this.$textarea.val(html).height(height).show().focus();
          this.$textarea.on('keydown.redactor-textarea-indenting', this.code.textareaIndenting);
          $(window).scrollTop(scroll);
          this.opts.visual = false;
          this.button.setInactiveInCode();
          this.button.setActive('html');
          this.core.setCallback('source', html);
        },
        showVisual: function () {
          if (this.opts.visual)
            return;
          var html = this.$textarea.hide().val();
          if (this.modified !== this.clean.removeSpaces(html)) {
            this.code.set(html);
          }
          this.$editor.show();
          if (!this.utils.isEmpty(html)) {
            this.placeholder.remove();
          }
          this.caret.setOffset(this.code.offset);
          this.$textarea.off('keydown.redactor-textarea-indenting');
          this.button.setActiveInVisual();
          this.button.setInactive('html');
          this.observe.load();
          this.opts.visual = true;
        },
        textareaIndenting: function (e) {
          if (e.keyCode !== 9)
            return true;
          var $el = this.$textarea;
          var start = $el.get(0).selectionStart;
          $el.val($el.val().substring(0, start) + '\t' + $el.val().substring($el.get(0).selectionEnd));
          $el.get(0).selectionStart = $el.get(0).selectionEnd = start + 1;
          return false;
        }
      };
    },
    clean: function () {
      return {
        onSet: function (html) {
          html = this.clean.savePreCode(html);
          // replace dollar sign to entity
          html = html.replace(/\$/g, '&#36;');
          html = html.replace(/”/g, '"');
          html = html.replace(/‘/g, '\'');
          html = html.replace(/’/g, '\'');
          if (this.opts.replaceDivs)
            html = this.clean.replaceDivs(html);
          if (this.opts.linebreaks)
            html = this.clean.replaceParagraphsToBr(html);
          // save form tag
          html = this.clean.saveFormTags(html);
          // convert font tag to span
          html = html.replace(/<font(.*?)style="(.*?)"(.*?)>([\w\W]*?)<\/font>/gi, '<span style="$2">$4</span>');
          // remove font tag
          html = html.replace(/<font(.*?[^<])>/gi, '');
          html = html.replace(/<\/font>/gi, '');
          // tidy html
          html = this.tidy.load(html);
          // paragraphize
          if (this.opts.paragraphize)
            html = this.paragraphize.load(html);
          // verified
          html = this.clean.setVerified(html);
          // convert inline tags
          html = this.clean.convertInline(html);
          return html;
        },
        onSync: function (html) {
          // remove spaces
          html = html.replace(/[\u200B-\u200D\uFEFF]/g, '');
          html = html.replace(/&#x200b;/gi, '');
          html = html.replace(/&nbsp;/gi, ' ');
          if (html.search(/^<p>(||\s||&nbsp;)<\/p>$/i) != -1) {
            return '';
          }
          // restore form tag
          html = this.clean.restoreFormTags(html);
          var chars = {
              '\u2122': '&trade;',
              '\xa9': '&copy;',
              '\u2026': '&hellip;',
              '\u2014': '&mdash;',
              '\u2010': '&dash;'
            };
          // replace special characters
          $.each(chars, function (i, s) {
            html = html.replace(new RegExp(i, 'g'), s);
          });
          // remove br in the of li
          html = html.replace(new RegExp('<br\\s?/?></li>', 'gi'), '</li>');
          html = html.replace(new RegExp('</li><br\\s?/?>', 'gi'), '</li>');
          // remove verified
          html = html.replace(new RegExp('<div(.*?) data-tagblock="redactor"(.*?[^>])>', 'gi'), '<div$1$2>');
          html = html.replace(new RegExp('<(.*?) data-verified="redactor"(.*?[^>])>', 'gi'), '<$1$2>');
          html = html.replace(new RegExp('<span(.*?) rel="(.*?)"(.*?[^>])>', 'gi'), '<span$1$3>');
          html = html.replace(new RegExp('<img(.*?) rel="(.*?)"(.*?[^>])>', 'gi'), '<img$1$3>');
          html = html.replace(new RegExp('<span class="redactor-invisible-space">(.*?)</span>', 'gi'), '$1');
          html = html.replace(/ data-save-url="(.*?[^>])"/gi, '');
          // remove image resize
          html = html.replace(/<span(.*?)id="redactor-image-box"(.*?[^>])>([\w\W]*?)<img(.*?)><\/span>/gi, '$3<img$4>');
          html = html.replace(/<span(.*?)id="redactor-image-resizer"(.*?[^>])>(.*?)<\/span>/gi, '');
          html = html.replace(/<span(.*?)id="redactor-image-editter"(.*?[^>])>(.*?)<\/span>/gi, '');
          // tidy html
          html = this.tidy.load(html);
          // link nofollow
          if (this.opts.linkNofollow) {
            html = html.replace(/<a(.*?)rel="nofollow"(.*?[^>])>/gi, '<a$1$2>');
            html = html.replace(/<a(.*?[^>])>/gi, '<a$1 rel="nofollow">');
          }
          // reconvert inline
          html = html.replace(/<(.*?) data-redactor-tag="(.*?)"(.*?[^>])>/gi, '<$1$3>');
          html = html.replace(/<(.*?) data-redactor-class="(.*?)"(.*?[^>])>/gi, '<$1$3>');
          html = html.replace(/<(.*?) data-redactor-style="(.*?)"(.*?[^>])>/gi, '<$1$3>');
          html = html.replace(new RegExp('<(.*?) data-verified="redactor"(.*?[^>])>', 'gi'), '<$1$2>');
          html = html.replace(new RegExp('<(.*?) data-verified="redactor">', 'gi'), '<$1>');
          return html;
        },
        onPaste: function (html, setMode) {
          html = $.trim(html);
          html = html.replace(/\$/g, '&#36;');
          html = html.replace(/”/g, '"');
          html = html.replace(/“/g, '"');
          html = html.replace(/‘/g, '\'');
          html = html.replace(/’/g, '\'');
          // convert dirty spaces
          html = html.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, ' ');
          html = html.replace(/<span class="Apple-tab-span"[^>]*>\t<\/span>/gi, '\t');
          html = html.replace(/<span[^>]*>(\s|&nbsp;)<\/span>/gi, ' ');
          if (this.opts.pastePlainText) {
            return this.clean.getPlainText(html);
          }
          if (!this.utils.isSelectAll() && typeof setMode == 'undefined') {
            if (this.utils.isCurrentOrParent([
                'FIGCAPTION',
                'A'
              ])) {
              return this.clean.getPlainText(html, false);
            }
            if (this.utils.isCurrentOrParent('PRE')) {
              return this.clean.getPreCode(html);
            }
            if (this.utils.isCurrentOrParent([
                'BLOCKQUOTE',
                'H1',
                'H2',
                'H3',
                'H4',
                'H5',
                'H6'
              ])) {
              html = this.clean.getOnlyImages(html);
              if (!this.utils.browser('msie')) {
                var block = this.selection.getBlock();
                if (block && block.tagName == 'P') {
                  html = html.replace(/<img(.*?)>/gi, '<p><img$1></p>');
                }
              }
              return html;
            }
            if (this.utils.isCurrentOrParent(['TD'])) {
              html = this.clean.onPasteTidy(html, 'td');
              if (this.opts.linebreaks)
                html = this.clean.replaceParagraphsToBr(html);
              html = this.clean.replaceDivsToBr(html);
              return html;
            }
            if (this.utils.isCurrentOrParent(['LI'])) {
              return this.clean.onPasteTidy(html, 'li');
            }
          }
          html = this.clean.isSingleLine(html, setMode);
          if (!this.clean.singleLine) {
            if (this.opts.linebreaks)
              html = this.clean.replaceParagraphsToBr(html);
            if (this.opts.replaceDivs)
              html = this.clean.replaceDivs(html);
            html = this.clean.saveFormTags(html);
          }
          html = this.clean.onPasteIeFixLinks(html);
          html = this.clean.onPasteWord(html);
          html = this.clean.onPasteExtra(html);
          html = this.clean.onPasteTidy(html, 'all');
          // paragraphize
          if (!this.clean.singleLine && this.opts.paragraphize) {
            html = this.paragraphize.load(html);
          }
          html = this.clean.removeDirtyStyles(html);
          html = this.clean.onPasteRemoveSpans(html);
          html = this.clean.onPasteRemoveEmpty(html);
          html = this.clean.convertInline(html);
          return html;
        },
        onPasteWord: function (html) {
          // comments
          html = html.replace(/<!--[\s\S]*?-->/gi, '');
          // style
          html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
          // shapes
          html = html.replace(/<img(.*?)v:shapes=(.*?)>/gi, '');
          html = html.replace(/src="file\:\/\/(.*?)"/, 'src=""');
          // list
          html = html.replace(/<p(.*?)class="MsoListParagraphCxSpFirst"([\w\W]*?)<\/p>/gi, '<ul><li$2</li>');
          html = html.replace(/<p(.*?)class="MsoListParagraphCxSpMiddle"([\w\W]*?)<\/p>/gi, '<li$2</li>');
          html = html.replace(/<p(.*?)class="MsoListParagraphCxSpLast"([\w\W]*?)<\/p>/gi, '<li$2</li></ul>');
          // one line
          html = html.replace(/<p(.*?)class="MsoListParagraph"([\w\W]*?)<\/p>/gi, '<ul><li$2</li></ul>');
          // remove ms word's bullet
          html = html.replace(/·/g, '');
          html = html.replace(/<p class="Mso(.*?)"/gi, '<p');
          // classes
          html = html.replace(/ class=\"(mso[^\"]*)\"/gi, '');
          html = html.replace(/ class=(mso\w+)/gi, '');
          // remove ms word tags
          html = html.replace(/<o:p(.*?)>([\w\W]*?)<\/o:p>/gi, '$2');
          // remove nbsp
          if (this.opts.cleanSpaces) {
            html = html.replace(/(\s|&nbsp;)+/g, ' ');
          }
          // ms word break lines
          html = html.replace(/\n/g, ' ');
          // ms word lists break lines
          html = html.replace(/<p>\n?<li>/gi, '<li>');
          return html;
        },
        onPasteExtra: function (html) {
          // remove google docs markers
          html = html.replace(/<b\sid="internal-source-marker(.*?)">([\w\W]*?)<\/b>/gi, '$2');
          html = html.replace(/<b(.*?)id="docs-internal-guid(.*?)">([\w\W]*?)<\/b>/gi, '$3');
          // google docs styles
          html = html.replace(/<span[^>]*(font-style: italic; font-weight: bold|font-weight: bold; font-style: italic)[^>]*>/gi, '<span style="font-weight: bold;"><span style="font-style: italic;">');
          html = html.replace(/<span[^>]*font-style: italic[^>]*>/gi, '<span style="font-style: italic;">');
          html = html.replace(/<span[^>]*font-weight: bold[^>]*>/gi, '<span style="font-weight: bold;">');
          html = html.replace(/<span[^>]*text-decoration: underline[^>]*>/gi, '<span style="text-decoration: underline;">');
          html = html.replace(/<img>/gi, '');
          html = html.replace(/\n{3,}/gi, '\n');
          html = html.replace(/<font(.*?)>([\w\W]*?)<\/font>/gi, '$2');
          // remove dirty p
          html = html.replace(/<p><p>/gi, '<p>');
          html = html.replace(/<\/p><\/p>/gi, '</p>');
          html = html.replace(/<li>(\s*|\t*|\n*)<p>/gi, '<li>');
          html = html.replace(/<\/p>(\s*|\t*|\n*)<\/li>/gi, '</li>');
          // remove space between paragraphs
          html = html.replace(/<\/p>\s<p/gi, '</p><p');
          // remove safari local images
          html = html.replace(/<img src="webkit-fake-url\:\/\/(.*?)"(.*?)>/gi, '');
          // bullets
          html = html.replace(/<p>•([\w\W]*?)<\/p>/gi, '<li>$1</li>');
          // FF fix
          if (this.utils.browser('mozilla')) {
            html = html.replace(/<br\s?\/?>$/gi, '');
          }
          return html;
        },
        onPasteTidy: function (html, type) {
          // remove all tags except these
          var tags = [
              'span',
              'a',
              'pre',
              'blockquote',
              'small',
              'em',
              'strong',
              'code',
              'kbd',
              'mark',
              'address',
              'cite',
              'var',
              'samp',
              'dfn',
              'sup',
              'sub',
              'b',
              'i',
              'u',
              'del',
              'ol',
              'ul',
              'li',
              'dl',
              'dt',
              'dd',
              'p',
              'br',
              'video',
              'audio',
              'embed',
              'param',
              'object',
              'img',
              'table',
              'td',
              'th',
              'tr',
              'tbody',
              'tfoot',
              'thead',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6'
            ];
          var tagsEmpty = false;
          var attrAllowed = [
              [
                'a',
                '*'
              ],
              [
                'img',
                [
                  'src',
                  'alt'
                ]
              ],
              [
                'span',
                [
                  'class',
                  'rel',
                  'data-verified'
                ]
              ],
              [
                'video',
                '*'
              ],
              [
                'audio',
                '*'
              ],
              [
                'embed',
                '*'
              ],
              [
                'object',
                '*'
              ],
              [
                'param',
                '*'
              ],
              [
                'source',
                '*'
              ]
            ];
          if (type == 'all') {
            tagsEmpty = [
              'p',
              'span',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6'
            ];
            attrAllowed = [
              [
                'table',
                'class'
              ],
              [
                'td',
                [
                  'colspan',
                  'rowspan'
                ]
              ],
              [
                'a',
                '*'
              ],
              [
                'img',
                [
                  'src',
                  'alt',
                  'data-redactor-inserted-image'
                ]
              ],
              [
                'span',
                [
                  'class',
                  'rel',
                  'data-verified'
                ]
              ],
              [
                'video',
                '*'
              ],
              [
                'audio',
                '*'
              ],
              [
                'embed',
                '*'
              ],
              [
                'object',
                '*'
              ],
              [
                'param',
                '*'
              ],
              [
                'source',
                '*'
              ]
            ];
          } else if (type == 'td') {
            // remove all tags except these and remove all table tags: tr, td etc
            tags = [
              'ul',
              'ol',
              'li',
              'span',
              'a',
              'small',
              'em',
              'strong',
              'code',
              'kbd',
              'mark',
              'cite',
              'var',
              'samp',
              'dfn',
              'sup',
              'sub',
              'b',
              'i',
              'u',
              'del',
              'ol',
              'ul',
              'li',
              'dl',
              'dt',
              'dd',
              'br',
              'video',
              'audio',
              'embed',
              'param',
              'object',
              'img',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6'
            ];
          } else if (type == 'li') {
            // only inline tags and ul, ol, li
            tags = [
              'ul',
              'ol',
              'li',
              'span',
              'a',
              'small',
              'em',
              'strong',
              'code',
              'kbd',
              'mark',
              'cite',
              'var',
              'samp',
              'dfn',
              'sup',
              'sub',
              'b',
              'i',
              'u',
              'del',
              'br',
              'video',
              'audio',
              'embed',
              'param',
              'object',
              'img'
            ];
          }
          var options = {
              deniedTags: false,
              allowedTags: tags,
              removeComments: true,
              removePhp: true,
              removeAttr: false,
              allowedAttr: attrAllowed,
              removeEmpty: tagsEmpty
            };
          return this.tidy.load(html, options);
        },
        onPasteRemoveEmpty: function (html) {
          html = html.replace(/<(p|h[1-6])>(|\s|\n|\t|<br\s?\/?>)<\/(p|h[1-6])>/gi, '');
          // remove br in the end
          if (!this.opts.linebreaks)
            html = html.replace(/<br>$/i, '');
          return html;
        },
        onPasteRemoveSpans: function (html) {
          html = html.replace(/<span>(.*?)<\/span>/gi, '$1');
          html = html.replace(/<span[^>]*>\s|&nbsp;<\/span>/gi, ' ');
          return html;
        },
        onPasteIeFixLinks: function (html) {
          if (!this.utils.browser('msie'))
            return html;
          var tmp = $.trim(html);
          if (tmp.search(/^<a(.*?)>(.*?)<\/a>$/i) === 0) {
            html = html.replace(/^<a(.*?)>(.*?)<\/a>$/i, '$2');
          }
          return html;
        },
        isSingleLine: function (html, setMode) {
          this.clean.singleLine = false;
          if (!this.utils.isSelectAll() && typeof setMode == 'undefined') {
            var blocks = this.opts.blockLevelElements.join('|').replace('P|', '').replace('DIV|', '');
            var matchBlocks = html.match(new RegExp('</(' + blocks + ')>', 'gi'));
            var matchContainers = html.match(/<\/(p|div)>/gi);
            if (!matchBlocks && (matchContainers === null || matchContainers && matchContainers.length <= 1)) {
              var matchBR = html.match(/<br\s?\/?>/gi);
              var matchIMG = html.match(/<img(.*?[^>])>/gi);
              if (!matchBR && !matchIMG) {
                this.clean.singleLine = true;
                html = html.replace(/<\/?(p|div)(.*?)>/gi, '');
              }
            }
          }
          return html;
        },
        stripTags: function (input, allowed) {
          allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
          var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
          return input.replace(tags, function ($0, $1) {
            return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
          });
        },
        savePreCode: function (html) {
          var pre = html.match(/<(pre|code)(.*?)>([\w\W]*?)<\/(pre|code)>/gi);
          if (pre !== null) {
            $.each(pre, $.proxy(function (i, s) {
              var arr = s.match(/<(pre|code)(.*?)>([\w\W]*?)<\/(pre|code)>/i);
              arr[3] = arr[3].replace(/<br\s?\/?>/g, '\n');
              arr[3] = arr[3].replace(/&nbsp;/g, ' ');
              if (this.opts.preSpaces) {
                arr[3] = arr[3].replace(/\t/g, Array(this.opts.preSpaces + 1).join(' '));
              }
              arr[3] = this.clean.encodeEntities(arr[3]);
              // $ fix
              arr[3] = arr[3].replace(/\$/g, '&#36;');
              html = html.replace(s, '<' + arr[1] + arr[2] + '>' + arr[3] + '</' + arr[1] + '>');
            }, this));
          }
          return html;
        },
        getTextFromHtml: function (html) {
          html = html.replace(/<br\s?\/?>|<\/H[1-6]>|<\/p>|<\/div>|<\/li>|<\/td>/gi, '\n');
          var tmp = document.createElement('div');
          tmp.innerHTML = html;
          html = tmp.textContent || tmp.innerText;
          return $.trim(html);
        },
        getPlainText: function (html, paragraphize) {
          html = this.clean.getTextFromHtml(html);
          html = html.replace(/\n/g, '<br />');
          if (this.opts.paragraphize && typeof paragraphize == 'undefined') {
            html = this.paragraphize.load(html);
          }
          return html;
        },
        getPreCode: function (html) {
          html = html.replace(/<img(.*?) style="(.*?)"(.*?[^>])>/gi, '<img$1$3>');
          html = html.replace(/<img(.*?)>/gi, '&lt;img$1&gt;');
          html = this.clean.getTextFromHtml(html);
          if (this.opts.preSpaces) {
            html = html.replace(/\t/g, Array(this.opts.preSpaces + 1).join(' '));
          }
          html = this.clean.encodeEntities(html);
          return html;
        },
        getOnlyImages: function (html) {
          html = html.replace(/<img(.*?)>/gi, '[img$1]');
          // remove all tags
          html = html.replace(/<(.*?)>/gi, '');
          html = html.replace(/\[img(.*?)\]/gi, '<img$1>');
          return html;
        },
        getOnlyLinksAndImages: function (html) {
          html = html.replace(/<a(.*?)href="(.*?)"(.*?)>([\w\W]*?)<\/a>/gi, '[a href="$2"]$4[/a]');
          html = html.replace(/<img(.*?)>/gi, '[img$1]');
          // remove all tags
          html = html.replace(/<(.*?)>/gi, '');
          html = html.replace(/\[a href="(.*?)"\]([\w\W]*?)\[\/a\]/gi, '<a href="$1">$2</a>');
          html = html.replace(/\[img(.*?)\]/gi, '<img$1>');
          return html;
        },
        encodeEntities: function (str) {
          str = String(str).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
          return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        },
        removeDirtyStyles: function (html) {
          if (this.utils.browser('msie'))
            return html;
          var div = document.createElement('div');
          div.innerHTML = html;
          this.clean.clearUnverifiedRemove($(div));
          html = div.innerHTML;
          $(div).remove();
          return html;
        },
        clearUnverified: function () {
          if (this.utils.browser('msie'))
            return;
          this.clean.clearUnverifiedRemove(this.$editor);
          var headers = this.$editor.find('h1, h2, h3, h4, h5, h6');
          headers.find('span').removeAttr('style');
          headers.find(this.opts.verifiedTags.join(', ')).removeAttr('style');
          this.code.sync();
        },
        clearUnverifiedRemove: function ($editor) {
          $editor.find(this.opts.verifiedTags.join(', ')).removeAttr('style');
          $editor.find('span').not('[data-verified="redactor"]').removeAttr('style');
          $editor.find('span[data-verified="redactor"], img[data-verified="redactor"]').each(function (i, s) {
            var $s = $(s);
            $s.attr('style', $s.attr('rel'));
          });
        },
        setVerified: function (html) {
          if (this.utils.browser('msie'))
            return html;
          html = html.replace(new RegExp('<img(.*?[^>])>', 'gi'), '<img$1 data-verified="redactor">');
          html = html.replace(new RegExp('<span(.*?)>', 'gi'), '<span$1 data-verified="redactor">');
          var matches = html.match(new RegExp('<(span|img)(.*?)style="(.*?)"(.*?[^>])>', 'gi'));
          if (matches) {
            var len = matches.length;
            for (var i = 0; i < len; i++) {
              var newTag = matches[i].replace(/style="(.*?)"/i, 'style="$1" rel="$1"');
              html = html.replace(new RegExp(matches[i], 'gi'), newTag);
            }
          }
          return html;
        },
        convertInline: function (html) {
          var $div = $('<div />').html(html);
          var tags = this.opts.inlineTags;
          tags.push('span');
          $div.find(tags.join(',')).each(function () {
            var $el = $(this);
            var tag = this.tagName.toLowerCase();
            $el.attr('data-redactor-tag', tag);
            if (tag == 'span') {
              if ($el.attr('style'))
                $el.attr('data-redactor-style', $el.attr('style'));
              else if ($el.attr('class'))
                $el.attr('data-redactor-class', $el.attr('class'));
            }
          });
          html = $div.html();
          $div.remove();
          return html;
        },
        normalizeLists: function () {
          this.$editor.find('li').each(function (i, s) {
            var $next = $(s).next();
            if ($next.length !== 0 && ($next[0].tagName == 'UL' || $next[0].tagName == 'OL')) {
              $(s).append($next);
            }
          });
        },
        removeSpaces: function (html) {
          html = html.replace(/\n/g, '');
          html = html.replace(/[\t]*/g, '');
          html = html.replace(/\n\s*\n/g, '\n');
          html = html.replace(/^[\s\n]*/g, ' ');
          html = html.replace(/[\s\n]*$/g, ' ');
          html = html.replace(/>\s{2,}</g, '> <');
          // between inline tags can be only one space
          html = html.replace(/\n\n/g, '\n');
          html = html.replace(/[\u200B-\u200D\uFEFF]/g, '');
          return html;
        },
        replaceDivs: function (html) {
          if (this.opts.linebreaks) {
            html = html.replace(/<div><br\s?\/?><\/div>/gi, '<br />');
            html = html.replace(/<div(.*?)>([\w\W]*?)<\/div>/gi, '$2<br />');
          } else {
            html = html.replace(/<div(.*?)>([\w\W]*?)<\/div>/gi, '<p$1>$2</p>');
          }
          return html;
        },
        replaceDivsToBr: function (html) {
          html = html.replace(/<div\s(.*?)>/gi, '<p>');
          html = html.replace(/<div><br\s?\/?><\/div>/gi, '<br /><br />');
          html = html.replace(/<div>([\w\W]*?)<\/div>/gi, '$1<br /><br />');
          return html;
        },
        replaceParagraphsToBr: function (html) {
          html = html.replace(/<p\s(.*?)>/gi, '<p>');
          html = html.replace(/<p><br\s?\/?><\/p>/gi, '<br />');
          html = html.replace(/<p>([\w\W]*?)<\/p>/gi, '$1<br /><br />');
          html = html.replace(/(<br\s?\/?>){1,}\n?<\/blockquote>/gi, '</blockquote>');
          return html;
        },
        saveFormTags: function (html) {
          return html.replace(/<form(.*?)>([\w\W]*?)<\/form>/gi, '<section$1 rel="redactor-form-tag">$2</section>');
        },
        restoreFormTags: function (html) {
          return html.replace(/<section(.*?) rel="redactor-form-tag"(.*?)>([\w\W]*?)<\/section>/gi, '<form$1$2>$3</form>');
        }
      };
    },
    tidy: function () {
      return {
        setupAllowed: function () {
          if (this.opts.allowedTags)
            this.opts.deniedTags = false;
          if (this.opts.allowedAttr)
            this.opts.removeAttr = false;
          if (this.opts.linebreaks)
            return;
          var tags = [
              'p',
              'section'
            ];
          if (this.opts.allowedTags)
            this.tidy.addToAllowed(tags);
          if (this.opts.deniedTags)
            this.tidy.removeFromDenied(tags);
        },
        addToAllowed: function (tags) {
          var len = tags.length;
          for (var i = 0; i < len; i++) {
            if ($.inArray(tags[i], this.opts.allowedTags) == -1) {
              this.opts.allowedTags.push(tags[i]);
            }
          }
        },
        removeFromDenied: function (tags) {
          var len = tags.length;
          for (var i = 0; i < len; i++) {
            var pos = $.inArray(tags[i], this.opts.deniedTags);
            if (pos != -1) {
              this.opts.deniedTags.splice(pos, 1);
            }
          }
        },
        load: function (html, options) {
          this.tidy.settings = {
            deniedTags: this.opts.deniedTags,
            allowedTags: this.opts.allowedTags,
            removeComments: this.opts.removeComments,
            replaceTags: this.opts.replaceTags,
            replaceStyles: this.opts.replaceStyles,
            removeDataAttr: this.opts.removeDataAttr,
            removeAttr: this.opts.removeAttr,
            allowedAttr: this.opts.allowedAttr,
            removeWithoutAttr: this.opts.removeWithoutAttr,
            removeEmpty: this.opts.removeEmpty
          };
          $.extend(this.tidy.settings, options);
          html = this.tidy.removeComments(html);
          html = this.tidy.replaceTags(html);
          // create container
          this.tidy.$div = $('<div />').append(html);
          // clean
          this.tidy.replaceStyles();
          this.tidy.removeTags();
          this.tidy.removeAttr();
          this.tidy.removeEmpty();
          this.tidy.removeParagraphsInLists();
          this.tidy.removeDataAttr();
          this.tidy.removeWithoutAttr();
          html = this.tidy.$div.html();
          this.tidy.$div.remove();
          return html;
        },
        removeComments: function (html) {
          if (!this.tidy.settings.removeComments)
            return html;
          return html.replace(/<!--[\s\S]*?-->/gi, '');
        },
        replaceTags: function (html) {
          if (!this.tidy.settings.replaceTags)
            return html;
          var len = this.tidy.settings.replaceTags.length;
          for (var i = 0; i < len; i++) {
            var re = new RegExp('<' + this.tidy.settings.replaceTags[i][0] + '(.*?[^>])>', 'gi');
            html = html.replace(re, '<' + this.tidy.settings.replaceTags[i][1] + '$1>');
            re = new RegExp('</' + this.tidy.settings.replaceTags[i][0] + '>', 'gi');
            html = html.replace(re, '</' + this.tidy.settings.replaceTags[i][1] + '>');
          }
          return html;
        },
        replaceStyles: function () {
          if (!this.tidy.settings.replaceStyles)
            return;
          var len = this.tidy.settings.replaceStyles.length;
          this.tidy.$div.find('span').each($.proxy(function (n, s) {
            var $el = $(s);
            var style = $el.attr('style');
            for (var i = 0; i < len; i++) {
              if (style && style.match(new RegExp('^' + this.tidy.settings.replaceStyles[i][0], 'i'))) {
                var tagName = this.tidy.settings.replaceStyles[i][1];
                $el.replaceWith(function () {
                  var tag = document.createElement(tagName);
                  return $(tag).append($(this).contents());
                });
              }
            }
          }, this));
        },
        removeTags: function () {
          if (!this.tidy.settings.deniedTags && this.tidy.settings.allowedTags) {
            this.tidy.$div.find('*').not(this.tidy.settings.allowedTags.join(',')).contents().unwrap();
          }
          if (this.tidy.settings.deniedTags) {
            this.tidy.$div.find(this.tidy.settings.deniedTags.join(',')).contents().unwrap();
          }
        },
        removeAttr: function () {
          var len;
          if (!this.tidy.settings.removeAttr && this.tidy.settings.allowedAttr) {
            var allowedAttrTags = [], allowedAttrData = [];
            len = this.tidy.settings.allowedAttr.length;
            for (var i = 0; i < len; i++) {
              allowedAttrTags.push(this.tidy.settings.allowedAttr[i][0]);
              allowedAttrData.push(this.tidy.settings.allowedAttr[i][1]);
            }
            this.tidy.$div.find('*').each($.proxy(function (n, s) {
              var $el = $(s);
              var pos = $.inArray($el[0].tagName.toLowerCase(), allowedAttrTags);
              var attributesRemove = this.tidy.removeAttrGetRemoves(pos, allowedAttrData, $el);
              if (attributesRemove) {
                $.each(attributesRemove, function (z, f) {
                  $el.removeAttr(f);
                });
              }
            }, this));
          }
          if (this.tidy.settings.removeAttr) {
            len = this.tidy.settings.removeAttr.length;
            for (var i = 0; i < len; i++) {
              var attrs = this.tidy.settings.removeAttr[i][1];
              if ($.isArray(attrs))
                attrs = attrs.join(' ');
              this.tidy.$div.find(this.tidy.settings.removeAttr[i][0]).removeAttr(attrs);
            }
          }
        },
        removeAttrGetRemoves: function (pos, allowed, $el) {
          var attributesRemove = [];
          // remove all attrs
          if (pos == -1) {
            $.each($el[0].attributes, function (i, item) {
              attributesRemove.push(item.name);
            });
          }  // allow all attrs
          else if (allowed[pos] == '*') {
            attributesRemove = [];
          }  // allow specific attrs
          else {
            $.each($el[0].attributes, function (i, item) {
              if ($.isArray(allowed[pos])) {
                if ($.inArray(item.name, allowed[pos]) == -1) {
                  attributesRemove.push(item.name);
                }
              } else if (allowed[pos] != item.name) {
                attributesRemove.push(item.name);
              }
            });
          }
          return attributesRemove;
        },
        removeAttrs: function (el, regex) {
          regex = new RegExp(regex, 'g');
          return el.each(function () {
            var self = $(this);
            var len = this.attributes.length - 1;
            for (var i = len; i >= 0; i--) {
              var item = this.attributes[i];
              if (item && item.specified && item.name.search(regex) >= 0) {
                self.removeAttr(item.name);
              }
            }
          });
        },
        removeEmpty: function () {
          if (!this.tidy.settings.removeEmpty)
            return;
          this.tidy.$div.find(this.tidy.settings.removeEmpty.join(',')).each(function () {
            var $el = $(this);
            var text = $el.text();
            text = text.replace(/[\u200B-\u200D\uFEFF]/g, '');
            text = text.replace(/&nbsp;/gi, '');
            text = text.replace(/\s/g, '');
            if (text === '' && $el.children().length === 0) {
              $el.remove();
            }
          });
        },
        removeParagraphsInLists: function () {
          this.tidy.$div.find('li p').contents().unwrap();
        },
        removeDataAttr: function () {
          if (!this.tidy.settings.removeDataAttr)
            return;
          var tags = this.tidy.settings.removeDataAttr;
          if ($.isArray(this.tidy.settings.removeDataAttr))
            tags = this.tidy.settings.removeDataAttr.join(',');
          this.tidy.removeAttrs(this.tidy.$div.find(tags), '^(data-)');
        },
        removeWithoutAttr: function () {
          if (!this.tidy.settings.removeWithoutAttr)
            return;
          this.tidy.$div.find(this.tidy.settings.removeWithoutAttr.join(',')).each(function () {
            if (this.attributes.length === 0) {
              $(this).contents().unwrap();
            }
          });
        }
      };
    },
    paragraphize: function () {
      return {
        load: function (html) {
          if (this.opts.linebreaks)
            return html;
          if (html === '' || html === '<p></p>')
            return this.opts.emptyHtml;
          this.paragraphize.blocks = [
            'table',
            'div',
            'pre',
            'form',
            'ul',
            'ol',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'dl',
            'blockquote',
            'figcaption',
            'address',
            'section',
            'header',
            'footer',
            'aside',
            'article',
            'object',
            'style',
            'script',
            'iframe',
            'select',
            'input',
            'textarea',
            'button',
            'option',
            'map',
            'area',
            'math',
            'hr',
            'fieldset',
            'legend',
            'hgroup',
            'nav',
            'figure',
            'details',
            'menu',
            'summary',
            'p'
          ];
          html = html + '\n';
          this.paragraphize.safes = [];
          this.paragraphize.z = 0;
          html = html.replace(/(<br\s?\/?>){1,}\n?<\/blockquote>/gi, '</blockquote>');
          html = this.paragraphize.getSafes(html);
          html = this.paragraphize.getSafesComments(html);
          html = this.paragraphize.replaceBreaksToNewLines(html);
          html = this.paragraphize.replaceBreaksToParagraphs(html);
          html = this.paragraphize.clear(html);
          html = this.paragraphize.restoreSafes(html);
          html = html.replace(new RegExp('<br\\s?/?>\n?<(' + this.paragraphize.blocks.join('|') + ')(.*?[^>])>', 'gi'), '<p><br /></p>\n<$1$2>');
          return $.trim(html);
        },
        getSafes: function (html) {
          var $div = $('<div />').append(html);
          // remove paragraphs in blockquotes
          $div.find('blockquote p').replaceWith(function () {
            return $(this).append('<br />').contents();
          });
          html = $div.html();
          $div.find(this.paragraphize.blocks.join(', ')).each($.proxy(function (i, s) {
            this.paragraphize.z++;
            this.paragraphize.safes[this.paragraphize.z] = s.outerHTML;
            html = html.replace(s.outerHTML, '\n{replace' + this.paragraphize.z + '}');
          }, this));
          return html;
        },
        getSafesComments: function (html) {
          var commentsMatches = html.match(/<!--([\w\W]*?)-->/gi);
          if (!commentsMatches)
            return html;
          $.each(commentsMatches, $.proxy(function (i, s) {
            this.paragraphize.z++;
            this.paragraphize.safes[this.paragraphize.z] = s;
            html = html.replace(s, '\n{replace' + this.paragraphize.z + '}');
          }, this));
          return html;
        },
        restoreSafes: function (html) {
          $.each(this.paragraphize.safes, function (i, s) {
            html = html.replace('{replace' + i + '}', s);
          });
          return html;
        },
        replaceBreaksToParagraphs: function (html) {
          var htmls = html.split(new RegExp('\n', 'g'), -1);
          html = '';
          if (htmls) {
            var len = htmls.length;
            for (var i = 0; i < len; i++) {
              if (!htmls.hasOwnProperty(i))
                return;
              if (htmls[i].search('{replace') == -1) {
                htmls[i] = htmls[i].replace(/<p>\n\t?<\/p>/gi, '');
                htmls[i] = htmls[i].replace(/<p><\/p>/gi, '');
                if (htmls[i] !== '') {
                  html += '<p>' + htmls[i].replace(/^\n+|\n+$/g, '') + '</p>';
                }
              } else
                html += htmls[i];
            }
          }
          return html;
        },
        replaceBreaksToNewLines: function (html) {
          html = html.replace(/<br \/>\s*<br \/>/gi, '\n\n');
          html = html.replace(/<br\s?\/?>\n?<br\s?\/?>/gi, '\n<br /><br />');
          html = html.replace(new RegExp('\r\n', 'g'), '\n');
          html = html.replace(new RegExp('\r', 'g'), '\n');
          html = html.replace(new RegExp('/\n\n+/'), 'g', '\n\n');
          return html;
        },
        clear: function (html) {
          html = html.replace(new RegExp('</blockquote></p>', 'gi'), '</blockquote>');
          html = html.replace(new RegExp('<p></blockquote>', 'gi'), '</blockquote>');
          html = html.replace(new RegExp('<p><blockquote>', 'gi'), '<blockquote>');
          html = html.replace(new RegExp('<blockquote></p>', 'gi'), '<blockquote>');
          html = html.replace(new RegExp('<p><p ', 'gi'), '<p ');
          html = html.replace(new RegExp('<p><p>', 'gi'), '<p>');
          html = html.replace(new RegExp('</p></p>', 'gi'), '</p>');
          html = html.replace(new RegExp('<p>\\s?</p>', 'gi'), '');
          html = html.replace(new RegExp('\n</p>', 'gi'), '</p>');
          html = html.replace(new RegExp('<p>\t?\t?\n?<p>', 'gi'), '<p>');
          html = html.replace(new RegExp('<p>\t*</p>', 'gi'), '');
          return html;
        }
      };
    },
    tabifier: function () {
      return {
        get: function (code) {
          if (!this.opts.tabifier)
            return code;
          // clean setup
          var ownLine = [
              'area',
              'body',
              'head',
              'hr',
              'i?frame',
              'link',
              'meta',
              'noscript',
              'style',
              'script',
              'table',
              'tbody',
              'thead',
              'tfoot'
            ];
          var contOwnLine = [
              'li',
              'dt',
              'dt',
              'h[1-6]',
              'option',
              'script'
            ];
          var newLevel = [
              'blockquote',
              'div',
              'dl',
              'fieldset',
              'form',
              'frameset',
              'map',
              'ol',
              'p',
              'pre',
              'select',
              'td',
              'th',
              'tr',
              'ul'
            ];
          this.tabifier.lineBefore = new RegExp('^<(/?' + ownLine.join('|/?') + '|' + contOwnLine.join('|') + ')[ >]');
          this.tabifier.lineAfter = new RegExp('^<(br|/?' + ownLine.join('|/?') + '|/' + contOwnLine.join('|/') + ')[ >]');
          this.tabifier.newLevel = new RegExp('^</?(' + newLevel.join('|') + ')[ >]');
          var i = 0, codeLength = code.length, point = 0, start = null, end = null, tag = '', out = '', cont = '';
          this.tabifier.cleanlevel = 0;
          for (; i < codeLength; i++) {
            point = i;
            // if no more tags, copy and exit
            if (-1 == code.substr(i).indexOf('<')) {
              out += code.substr(i);
              return this.tabifier.finish(out);
            }
            // copy verbatim until a tag
            while (point < codeLength && code.charAt(point) != '<') {
              point++;
            }
            if (i != point) {
              cont = code.substr(i, point - i);
              if (!cont.match(/^\s{2,}$/g)) {
                if ('\n' == out.charAt(out.length - 1))
                  out += this.tabifier.getTabs();
                else if ('\n' == cont.charAt(0)) {
                  out += '\n' + this.tabifier.getTabs();
                  cont = cont.replace(/^\s+/, '');
                }
                out += cont;
              }
              if (cont.match(/\n/))
                out += '\n' + this.tabifier.getTabs();
            }
            start = point;
            // find the end of the tag
            while (point < codeLength && '>' != code.charAt(point)) {
              point++;
            }
            tag = code.substr(start, point - start);
            i = point;
            var t;
            if ('!--' == tag.substr(1, 3)) {
              if (!tag.match(/--$/)) {
                while ('-->' != code.substr(point, 3)) {
                  point++;
                }
                point += 2;
                tag = code.substr(start, point - start);
                i = point;
              }
              if ('\n' != out.charAt(out.length - 1))
                out += '\n';
              out += this.tabifier.getTabs();
              out += tag + '>\n';
            } else if ('!' == tag[1]) {
              out = this.tabifier.placeTag(tag + '>', out);
            } else if ('?' == tag[1]) {
              out += tag + '>\n';
            } else if (t = tag.match(/^<(script|style|pre)/i)) {
              t[1] = t[1].toLowerCase();
              tag = this.tabifier.cleanTag(tag);
              out = this.tabifier.placeTag(tag, out);
              end = String(code.substr(i + 1)).toLowerCase().indexOf('</' + t[1]);
              if (end) {
                cont = code.substr(i + 1, end);
                i += end;
                out += cont;
              }
            } else {
              tag = this.tabifier.cleanTag(tag);
              out = this.tabifier.placeTag(tag, out);
            }
          }
          return this.tabifier.finish(out);
        },
        getTabs: function () {
          var s = '';
          for (var j = 0; j < this.tabifier.cleanlevel; j++) {
            s += '\t';
          }
          return s;
        },
        finish: function (code) {
          code = code.replace(/\n\s*\n/g, '\n');
          code = code.replace(/^[\s\n]*/, '');
          code = code.replace(/[\s\n]*$/, '');
          code = code.replace(/<script(.*?)>\n<\/script>/gi, '<script$1></script>');
          this.tabifier.cleanlevel = 0;
          return code;
        },
        cleanTag: function (tag) {
          var tagout = '';
          tag = tag.replace(/\n/g, ' ');
          tag = tag.replace(/\s{2,}/g, ' ');
          tag = tag.replace(/^\s+|\s+$/g, ' ');
          var suffix = '';
          if (tag.match(/\/$/)) {
            suffix = '/';
            tag = tag.replace(/\/+$/, '');
          }
          var m;
          while (m = /\s*([^= ]+)(?:=((['"']).*?\3|[^ ]+))?/.exec(tag)) {
            if (m[2])
              tagout += m[1].toLowerCase() + '=' + m[2];
            else if (m[1])
              tagout += m[1].toLowerCase();
            tagout += ' ';
            tag = tag.substr(m[0].length);
          }
          return tagout.replace(/\s*$/, '') + suffix + '>';
        },
        placeTag: function (tag, out) {
          var nl = tag.match(this.tabifier.newLevel);
          if (tag.match(this.tabifier.lineBefore) || nl) {
            out = out.replace(/\s*$/, '');
            out += '\n';
          }
          if (nl && '/' == tag.charAt(1))
            this.tabifier.cleanlevel--;
          if ('\n' == out.charAt(out.length - 1))
            out += this.tabifier.getTabs();
          if (nl && '/' != tag.charAt(1))
            this.tabifier.cleanlevel++;
          out += tag;
          if (tag.match(this.tabifier.lineAfter) || tag.match(this.tabifier.newLevel)) {
            out = out.replace(/ *$/, '');
            out += '\n';
          }
          return out;
        }
      };
    },
    focus: function () {
      return {
        setStart: function () {
          this.$editor.focus();
          var first = this.$editor.children().first();
          if (first.size() === 0)
            return;
          if (first[0].length === 0 || first[0].tagName == 'BR' || first[0].nodeType == 3) {
            return;
          }
          if (first[0].tagName == 'UL' || first[0].tagName == 'OL') {
            first = first.find('li').first();
            var child = first.children().first();
            if (!this.utils.isBlock(child) && child.text() == '') {
              // empty inline tag in li
              this.caret.setStart(child);
              return;
            }
          }
          if (this.opts.linebreaks && !this.utils.isBlockTag(first[0].tagName)) {
            this.selection.get();
            this.range.setStart(this.$editor[0], 0);
            this.range.setEnd(this.$editor[0], 0);
            this.selection.addRange();
            return;
          }
          // if node is tag
          this.caret.setStart(first);
        },
        setEnd: function () {
          if (this.utils.browser('mozilla') || this.utils.browser('msie')) {
            var last = this.$editor.children().last();
            this.caret.setEnd(last);
          } else {
            this.selection.get();
            try {
              this.range.selectNodeContents(this.$editor[0]);
              this.range.collapse(false);
              this.selection.addRange();
            } catch (e) {
            }
          }
        },
        isFocused: function () {
          var focusNode = document.getSelection().focusNode;
          if (focusNode === null)
            return false;
          if (this.opts.linebreaks && $(focusNode.parentNode).hasClass('redactor-linebreaks'))
            return true;
          else if (!this.utils.isRedactorParent(focusNode.parentNode))
            return false;
          return this.$editor.is(':focus');
        }
      };
    },
    placeholder: function () {
      return {
        enable: function () {
          if (!this.placeholder.is())
            return;
          this.$editor.attr('placeholder', this.$element.attr('placeholder'));
          this.placeholder.toggle();
          this.$editor.on('keyup.redactor-placeholder', $.proxy(this.placeholder.toggle, this));
        },
        toggle: function () {
          var func = 'removeClass';
          if (this.utils.isEmpty(this.$editor.html(), false))
            func = 'addClass';
          this.$editor[func]('redactor-placeholder');
        },
        remove: function () {
          this.$editor.removeClass('redactor-placeholder');
        },
        is: function () {
          if (this.opts.placeholder) {
            return this.$element.attr('placeholder', this.opts.placeholder);
          } else {
            return !(typeof this.$element.attr('placeholder') == 'undefined' || this.$element.attr('placeholder') === '');
          }
        }
      };
    },
    autosave: function () {
      return {
        enable: function () {
          if (!this.opts.autosave)
            return;
          this.autosave.html = false;
          this.autosave.name = this.opts.autosaveName ? this.opts.autosaveName : this.$textarea.attr('name');
          if (!this.opts.autosaveOnChange) {
            this.autosaveInterval = setInterval($.proxy(this.autosave.load, this), this.opts.autosaveInterval * 1000);
          }
        },
        onChange: function () {
          if (!this.opts.autosaveOnChange)
            return;
          this.autosave.load();
        },
        load: function () {
          var html = this.code.get();
          if (this.autosave.html === html)
            return;
          if (this.utils.isEmpty(html))
            return;
          $.ajax({
            url: this.opts.autosave,
            type: 'post',
            data: 'name=' + this.autosave.name + '&' + this.autosave.name + '=' + escape(encodeURIComponent(html)),
            success: $.proxy(function (data) {
              this.autosave.success(data, html);
            }, this)
          });
        },
        success: function (data, html) {
          var json;
          try {
            json = $.parseJSON(data);
          } catch (e) {
            //data has already been parsed
            json = data;
          }
          var callbackName = typeof json.error == 'undefined' ? 'autosave' : 'autosaveError';
          this.core.setCallback(callbackName, this.autosave.name, json);
          this.autosave.html = html;
        },
        disable: function () {
          clearInterval(this.autosaveInterval);
        }
      };
    },
    buffer: function () {
      return {
        set: function (type) {
          if (typeof type == 'undefined' || type == 'undo') {
            this.buffer.setUndo();
          } else {
            this.buffer.setRedo();
          }
        },
        setUndo: function () {
          this.selection.save();
          this.opts.buffer.push(this.$editor.html());
          this.selection.restore();
        },
        setRedo: function () {
          this.selection.save();
          this.opts.rebuffer.push(this.$editor.html());
          this.selection.restore();
        },
        getUndo: function () {
          this.$editor.html(this.opts.buffer.pop());
        },
        getRedo: function () {
          this.$editor.html(this.opts.rebuffer.pop());
        },
        add: function () {
          this.opts.buffer.push(this.$editor.html());
        },
        undo: function () {
          if (this.opts.buffer.length === 0)
            return;
          this.buffer.set('redo');
          this.buffer.getUndo();
          this.selection.restore();
          setTimeout($.proxy(this.observe.load, this), 50);
        },
        redo: function () {
          if (this.opts.rebuffer.length === 0)
            return;
          this.buffer.set('undo');
          this.buffer.getRedo();
          this.selection.restore();
          setTimeout($.proxy(this.observe.load, this), 50);
        }
      };
    },
    indent: function () {
      return {
        increase: function () {
          // focus
          if (!this.utils.browser('msie'))
            this.$editor.focus();
          this.buffer.set();
          this.selection.save();
          var block = this.selection.getBlock();
          if (block && block.tagName == 'LI') {
            this.indent.increaseLists();
          } else if (block === false && this.opts.linebreaks) {
            this.indent.increaseText();
          } else {
            this.indent.increaseBlocks();
          }
          this.selection.restore();
          this.code.sync();
        },
        increaseLists: function () {
          document.execCommand('indent');
          this.indent.fixEmptyIndent();
          this.clean.normalizeLists();
          this.clean.clearUnverified();
        },
        increaseBlocks: function () {
          $.each(this.selection.getBlocks(), $.proxy(function (i, elem) {
            if (elem.tagName === 'TD' || elem.tagName === 'TH')
              return;
            var $el = this.utils.getAlignmentElement(elem);
            var left = this.utils.normalize($el.css('margin-left')) + this.opts.indentValue;
            $el.css('margin-left', left + 'px');
          }, this));
        },
        increaseText: function () {
          var wrapper = this.selection.wrap('div');
          $(wrapper).attr('data-tagblock', 'redactor');
          $(wrapper).css('margin-left', this.opts.indentValue + 'px');
        },
        decrease: function () {
          this.buffer.set();
          this.selection.save();
          var block = this.selection.getBlock();
          if (block && block.tagName == 'LI') {
            this.indent.decreaseLists();
          } else {
            this.indent.decreaseBlocks();
          }
          this.selection.restore();
          this.code.sync();
        },
        decreaseLists: function () {
          document.execCommand('outdent');
          var current = this.selection.getCurrent();
          var $item = $(current).closest('li');
          var $parent = $item.parent();
          if ($item.size() !== 0 && $parent.size() !== 0 && $parent[0].tagName == 'LI') {
            $parent.after($item);
          }
          this.indent.fixEmptyIndent();
          if (!this.opts.linebreaks && $item.size() === 0) {
            document.execCommand('formatblock', false, 'p');
            this.$editor.find('ul, ol, blockquote, p').each($.proxy(this.utils.removeEmpty, this));
          }
          this.clean.clearUnverified();
        },
        decreaseBlocks: function () {
          $.each(this.selection.getBlocks(), $.proxy(function (i, elem) {
            var $el = this.utils.getAlignmentElement(elem);
            var left = this.utils.normalize($el.css('margin-left')) - this.opts.indentValue;
            if (left <= 0) {
              if (this.opts.linebreaks && typeof $el.data('tagblock') !== 'undefined') {
                $el.replaceWith($el.html() + '<br />');
              } else {
                $el.css('margin-left', '');
                this.utils.removeEmptyAttr($el, 'style');
              }
            } else {
              $el.css('margin-left', left + 'px');
            }
          }, this));
        },
        fixEmptyIndent: function () {
          var block = this.selection.getBlock();
          if (this.range.collapsed && block && block.tagName == 'LI' && this.utils.isEmpty($(block).text())) {
            var $block = $(block);
            $block.find('span').not('.redactor-selection-marker').contents().unwrap();
            $block.append('<br>');
          }
        }
      };
    },
    alignment: function () {
      return {
        left: function () {
          this.alignment.set('');
        },
        right: function () {
          this.alignment.set('right');
        },
        center: function () {
          this.alignment.set('center');
        },
        justify: function () {
          this.alignment.set('justify');
        },
        set: function (type) {
          if (!this.utils.browser('msie'))
            this.$editor.focus();
          this.buffer.set();
          this.selection.save();
          this.alignment.blocks = this.selection.getBlocks();
          if (this.opts.linebreaks && this.alignment.blocks[0] === false) {
            this.alignment.setText(type);
          } else {
            this.alignment.setBlocks(type);
          }
          this.selection.restore();
          this.code.sync();
        },
        setText: function (type) {
          var wrapper = this.selection.wrap('div');
          $(wrapper).attr('data-tagblock', 'redactor');
          $(wrapper).css('text-align', type);
        },
        setBlocks: function (type) {
          $.each(this.alignment.blocks, $.proxy(function (i, el) {
            var $el = this.utils.getAlignmentElement(el);
            if (!$el)
              return;
            if (type === '' && typeof $el.data('tagblock') !== 'undefined') {
              $el.replaceWith($el.html());
            } else {
              $el.css('text-align', type);
              this.utils.removeEmptyAttr($el, 'style');
            }
          }, this));
        }
      };
    },
    paste: function () {
      return {
        init: function (e) {
          if (!this.opts.cleanOnPaste)
            return;
          this.rtePaste = true;
          this.buffer.set();
          this.selection.save();
          this.utils.saveScroll();
          this.paste.createPasteBox();
          $(window).on('scroll.redactor-freeze', $.proxy(function () {
            $(window).scrollTop(this.saveBodyScroll);
          }, this));
          setTimeout($.proxy(function () {
            var html = this.$pasteBox.html();
            this.$pasteBox.remove();
            this.selection.restore();
            this.utils.restoreScroll();
            this.paste.insert(html);
            $(window).off('scroll.redactor-freeze');
          }, this), 1);
        },
        createPasteBox: function () {
          this.$pasteBox = $('<div>').html(' ').attr('contenteditable', 'true').css({
            position: 'fixed',
            width: 0,
            top: 0,
            left: '-9999px'
          });
          $(document.body).append(this.$pasteBox);
          this.$pasteBox.focus();
        },
        insert: function (html) {
          html = this.core.setCallback('pasteBefore', html);
          // clean
          html = this.utils.isSelectAll() ? this.clean.onPaste(html, false) : this.clean.onPaste(html);
          html = this.core.setCallback('paste', html);
          if (this.utils.isSelectAll()) {
            this.insert.set(html, false);
          } else {
            this.insert.html(html, false);
          }
          this.utils.disableSelectAll();
          this.rtePaste = false;
          setTimeout($.proxy(this.clean.clearUnverified, this), 10);
        }
      };
    },
    keydown: function () {
      return {
        init: function (e) {
          if (this.rtePaste)
            return;
          var key = e.which;
          var arrow = key >= 37 && key <= 40;
          this.keydown.ctrl = e.ctrlKey || e.metaKey;
          this.keydown.current = this.selection.getCurrent();
          this.keydown.parent = this.selection.getParent();
          this.keydown.block = this.selection.getBlock();
          // detect tags
          this.keydown.pre = this.utils.isTag(this.keydown.current, 'pre');
          this.keydown.blockquote = this.utils.isTag(this.keydown.current, 'blockquote');
          this.keydown.figcaption = this.utils.isTag(this.keydown.current, 'figcaption');
          // shortcuts setup
          this.shortcuts.init(e, key);
          this.keydown.checkEvents(arrow, key);
          this.keydown.setupBuffer(e, key);
          this.keydown.addArrowsEvent(arrow);
          this.keydown.setupSelectAll(e, key);
          // callback
          var keydownStop = this.core.setCallback('keydown', e);
          if (keydownStop === false) {
            e.preventDefault();
            return false;
          }
          // down
          if (this.opts.enterKey && key === this.keyCode.DOWN) {
            this.keydown.onArrowDown();
          }
          // turn off enter key
          if (!this.opts.enterKey && key === this.keyCode.ENTER) {
            e.preventDefault();
            // remove selected
            if (!this.range.collapsed)
              this.range.deleteContents();
            return;
          }
          // on enter
          if (key == this.keyCode.ENTER && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
            var stop = this.core.setCallback('enter', e);
            if (stop === false) {
              e.preventDefault();
              return false;
            }
            if (this.keydown.blockquote && this.keydown.exitFromBlockquote(e) === true) {
              return false;
            }
            var current, $next;
            if (this.keydown.pre) {
              return this.keydown.insertNewLine(e);
            } else if (this.keydown.blockquote || this.keydown.figcaption) {
              current = this.selection.getCurrent();
              $next = $(current).next();
              if ($next.size() !== 0 && $next[0].tagName == 'BR') {
                return this.keydown.insertBreakLine(e);
              } else if (this.utils.isEndOfElement() && (current && current != 'SPAN')) {
                return this.keydown.insertDblBreakLine(e);
              } else {
                return this.keydown.insertBreakLine(e);
              }
            } else if (this.opts.linebreaks && !this.keydown.block) {
              current = this.selection.getCurrent();
              $next = $(this.keydown.current).next();
              if (current !== false && $(current).hasClass('redactor-invisible-space')) {
                $(current).remove();
                return this.keydown.insertDblBreakLine(e);
              } else {
                if ($next.length === 0 && current === false && typeof $next.context != 'undefined') {
                  return this.keydown.insertDblBreakLine(e);
                }
                return this.keydown.insertBreakLine(e);
              }
            } else if (this.opts.linebreaks && this.keydown.block) {
              setTimeout($.proxy(this.keydown.replaceDivToBreakLine, this), 1);
            }  // paragraphs
            else if (!this.opts.linebreaks && this.keydown.block && this.keydown.block.tagName !== 'LI') {
              setTimeout($.proxy(this.keydown.replaceDivToParagraph, this), 1);
            } else if (!this.opts.linebreaks && !this.keydown.block) {
              return this.keydown.insertParagraph(e);
            }
          }
          // Shift+Enter or Ctrl+Enter
          if (key === this.keyCode.ENTER && (e.ctrlKey || e.shiftKey)) {
            return this.keydown.onShiftEnter(e);
          }
          // tab or cmd + [
          if (key === this.keyCode.TAB || e.metaKey && key === 221 || e.metaKey && key === 219) {
            return this.keydown.onTab(e, key);
          }
          // image delete and backspace
          if (key === this.keyCode.BACKSPACE || key === this.keyCode.DELETE) {
            var nodes = this.selection.getNodes();
            if (nodes) {
              var len = nodes.length;
              var last;
              for (var i = 0; i < len; i++) {
                var children = $(nodes[i]).children('img');
                if (children.size() !== 0) {
                  var self = this;
                  $.each(children, function (z, s) {
                    var $s = $(s);
                    if ($s.css('float') != 'none')
                      return;
                    // image delete callback
                    self.core.setCallback('imageDelete', s.src, $s);
                    last = s;
                  });
                } else if (nodes[i].tagName == 'IMG') {
                  if (last != nodes[i]) {
                    // image delete callback
                    this.core.setCallback('imageDelete', nodes[i].src, $(nodes[i]));
                    last = nodes[i];
                  }
                }
              }
            }
          }
          // backspace
          if (key === this.keyCode.BACKSPACE) {
            this.keydown.removeInvisibleSpace();
            this.keydown.removeEmptyListInTable(e);
          }
          this.code.sync();
        },
        checkEvents: function (arrow, key) {
          if (!arrow && (this.core.getEvent() == 'click' || this.core.getEvent() == 'arrow')) {
            this.core.addEvent(false);
            if (this.keydown.checkKeyEvents(key)) {
              this.buffer.set();
            }
          }
        },
        checkKeyEvents: function (key) {
          var k = this.keyCode;
          var keys = [
              k.BACKSPACE,
              k.DELETE,
              k.ENTER,
              k.SPACE,
              k.ESC,
              k.TAB,
              k.CTRL,
              k.META,
              k.ALT,
              k.SHIFT
            ];
          return $.inArray(key, keys) == -1 ? true : false;
        },
        addArrowsEvent: function (arrow) {
          if (!arrow)
            return;
          if (this.core.getEvent() == 'click' || this.core.getEvent() == 'arrow') {
            this.core.addEvent(false);
            return;
          }
          this.core.addEvent('arrow');
        },
        setupBuffer: function (e, key) {
          if (this.keydown.ctrl && key === 90 && !e.shiftKey && !e.altKey && this.opts.buffer.length)
            // z key
            {
              e.preventDefault();
              this.buffer.undo();
              return;
            }  // undo
          else if (this.keydown.ctrl && key === 90 && e.shiftKey && !e.altKey && this.opts.rebuffer.length !== 0) {
            e.preventDefault();
            this.buffer.redo();
            return;
          } else if (!this.keydown.ctrl) {
            if (key == this.keyCode.BACKSPACE || key == this.keyCode.DELETE || key == this.keyCode.ENTER && !e.ctrlKey && !e.shiftKey || key == this.keyCode.SPACE) {
              this.buffer.set();
            }
          }
        },
        setupSelectAll: function (e, key) {
          if (this.keydown.ctrl && key === 65) {
            this.utils.enableSelectAll();
          } else if (key != this.keyCode.LEFT_WIN && !this.keydown.ctrl) {
            this.utils.disableSelectAll();
          }
        },
        onArrowDown: function () {
          var tags = [
              this.keydown.blockquote,
              this.keydown.pre,
              this.keydown.figcaption
            ];
          for (var i = 0; i < tags.length; i++) {
            if (tags[i]) {
              this.keydown.insertAfterLastElement(tags[i]);
              return false;
            }
          }
        },
        onShiftEnter: function (e) {
          this.buffer.set();
          if (this.keydown.blockquote && this.utils.isEndOfElement()) {
            return this.keydown.insertDblBreakLine(e);
          }
          return this.keydown.insertBreakLine(e);
        },
        onTab: function (e, key) {
          if (!this.opts.tabFocus)
            return true;
          if (this.utils.isEmpty(this.code.get()) && this.opts.tabAsSpaces === false)
            return true;
          e.preventDefault();
          var node;
          if (this.keydown.pre && !e.shiftKey) {
            node = this.opts.preSpaces ? document.createTextNode(Array(this.opts.preSpaces + 1).join('\xa0')) : document.createTextNode('\t');
            this.insert.node(node);
            this.code.sync();
          } else if (this.opts.tabAsSpaces !== false) {
            node = document.createTextNode(Array(this.opts.tabAsSpaces + 1).join('\xa0'));
            this.insert.node(node);
            this.code.sync();
          } else {
            if (e.metaKey && key === 219)
              this.indent.decrease();
            else if (e.metaKey && key === 221)
              this.indent.increase();
            else if (!e.shiftKey)
              this.indent.increase();
            else
              this.indent.decrease();
          }
          return false;
        },
        replaceDivToBreakLine: function () {
          var blockElem = this.selection.getBlock();
          var blockHtml = blockElem.innerHTML.replace(/<br\s?\/?>/gi, '');
          if ((blockElem.tagName === 'DIV' || blockElem.tagName === 'P') && blockHtml === '' && !$(blockElem).hasClass('redactor-editor')) {
            var br = document.createElement('br');
            $(blockElem).replaceWith(br);
            this.caret.setBefore(br);
            this.code.sync();
            return false;
          }
        },
        replaceDivToParagraph: function () {
          var blockElem = this.selection.getBlock();
          var blockHtml = blockElem.innerHTML.replace(/<br\s?\/?>/gi, '');
          if (blockElem.tagName === 'DIV' && blockHtml === '' && !$(blockElem).hasClass('redactor-editor')) {
            var p = document.createElement('p');
            p.innerHTML = this.opts.invisibleSpace;
            $(blockElem).replaceWith(p);
            this.caret.setStart(p);
            this.code.sync();
            return false;
          } else if (this.opts.cleanStyleOnEnter && blockElem.tagName == 'P') {
            $(blockElem).removeAttr('class').removeAttr('style');
          }
        },
        insertParagraph: function (e) {
          e.preventDefault();
          this.selection.get();
          var p = document.createElement('p');
          p.innerHTML = this.opts.invisibleSpace;
          this.range.deleteContents();
          this.range.insertNode(p);
          this.caret.setStart(p);
          this.code.sync();
          return false;
        },
        exitFromBlockquote: function (e) {
          if (!this.utils.isEndOfElement())
            return;
          var tmp = $.trim($(this.keydown.block).html());
          if (tmp.search(/(<br\s?\/?>){2}$/i) != -1) {
            e.preventDefault();
            if (this.opts.linebreaks) {
              var br = document.createElement('br');
              $(this.keydown.blockquote).after(br);
              this.caret.setBefore(br);
              $(this.keydown.block).html(tmp.replace(/<br\s?\/?>$/i, ''));
            } else {
              var node = $(this.opts.emptyHtml);
              $(this.keydown.blockquote).after(node);
              this.caret.setStart(node);
            }
            return true;
          }
          return;
        },
        insertAfterLastElement: function (element) {
          if (!this.utils.isEndOfElement())
            return;
          this.buffer.set();
          if (this.opts.linebreaks) {
            var contents = $('<div>').append($.trim(this.$editor.html())).contents();
            var last = contents.last()[0];
            if (last.tagName == 'SPAN' && last.innerHTML === '') {
              last = contents.prev()[0];
            }
            if (this.utils.getOuterHtml(last) != this.utils.getOuterHtml(element))
              return;
            var br = document.createElement('br');
            $(element).after(br);
            this.caret.setAfter(br);
          } else {
            if (this.$editor.contents().last()[0] !== element)
              return;
            var node = $(this.opts.emptyHtml);
            $(element).after(node);
            this.caret.setStart(node);
          }
        },
        insertNewLine: function (e) {
          e.preventDefault();
          var node = document.createTextNode('\n');
          this.selection.get();
          this.range.deleteContents();
          this.range.insertNode(node);
          this.caret.setAfter(node);
          this.code.sync();
          return false;
        },
        insertBreakLine: function (e) {
          return this.keydown.insertBreakLineProcessing(e);
        },
        insertDblBreakLine: function (e) {
          return this.keydown.insertBreakLineProcessing(e, true);
        },
        insertBreakLineProcessing: function (e, dbl) {
          e.stopPropagation();
          this.selection.get();
          var br1 = document.createElement('br');
          this.range.deleteContents();
          this.range.insertNode(br1);
          if (dbl === true) {
            var br2 = document.createElement('br');
            this.range.insertNode(br2);
            this.caret.setAfter(br2);
          } else {
            this.caret.setAfter(br1);
          }
          this.code.sync();
          return false;
        },
        removeInvisibleSpace: function () {
          var $current = $(this.keydown.current);
          if ($current.text().search(/^\u200B$/g) === 0) {
            $current.remove();
          }
        },
        removeEmptyListInTable: function (e) {
          var $current = $(this.keydown.current);
          var $parent = $(this.keydown.parent);
          var td = $current.closest('td');
          if (td.size() !== 0 && $current.closest('li') && $parent.children('li').size() === 1) {
            if (!this.utils.isEmpty($current.text()))
              return;
            e.preventDefault();
            $current.remove();
            $parent.remove();
            this.caret.setStart(td);
          }
        }
      };
    },
    keyup: function () {
      return {
        init: function (e) {
          if (this.rtePaste)
            return;
          var key = e.which;
          this.keyup.current = this.selection.getCurrent();
          this.keyup.parent = this.selection.getParent();
          var $parent = this.utils.isRedactorParent($(this.keyup.parent).parent());
          // callback
          var keyupStop = this.core.setCallback('keyup', e);
          if (keyupStop === false) {
            e.preventDefault();
            return false;
          }
          // replace to p before / after the table or body
          if (!this.opts.linebreaks && this.keyup.current.nodeType == 3 && this.keyup.current.length <= 1 && (this.keyup.parent === false || this.keyup.parent.tagName == 'BODY')) {
            this.keyup.replaceToParagraph();
          }
          if ($(this.keyup.parent).hasClass('redactor-invisible-space') && ($parent === false || $parent[0].tagName == 'BODY')) {
            $(this.keyup.parent).contents().unwrap();
            this.keyup.replaceToParagraph();
          }
          // linkify
          if (this.opts.convertLinks && (this.opts.convertUrlLinks || this.opts.convertImageLinks || this.opts.convertVideoLinks) && key === this.keyCode.ENTER) {
            this.formatLinkify(this.opts.linkProtocol, this.opts.convertLinks, this.opts.convertUrlLinks, this.opts.convertImageLinks, this.opts.convertVideoLinks, this.opts.linkSize);
            this.observe.load();
            this.code.sync();
          }
          if (key === this.keyCode.DELETE || key === this.keyCode.BACKSPACE) {
            // clear unverified
            this.clean.clearUnverified();
            if (this.observe.image) {
              e.preventDefault();
              this.image.hideResize();
              this.buffer.set();
              this.image.remove(this.observe.image);
              this.observe.image = false;
              return false;
            }
            // remove empty paragraphs
            this.$editor.find('p').each($.proxy(this.utils.removeEmpty, this));
            // remove invisible space
            if (this.keyup.current && this.keyup.current.tagName == 'DIV' && this.utils.isEmpty(this.keyup.current.innerHTML)) {
              if (this.opts.linebreaks) {
                $(this.keyup.current).after(this.selection.getMarkerAsHtml());
                this.selection.restore();
                $(this.keyup.current).remove();
              }
            }
            // if empty
            return this.keyup.formatEmpty(e);
          }
        },
        replaceToParagraph: function () {
          var $current = $(this.keyup.current);
          var node = $('<p>').append($current.clone());
          $current.replaceWith(node);
          var next = $(node).next();
          if (typeof next[0] !== 'undefined' && next[0].tagName == 'BR') {
            next.remove();
          }
          this.caret.setEnd(node);
        },
        formatEmpty: function (e) {
          var html = $.trim(this.$editor.html());
          if (!this.utils.isEmpty(html))
            return;
          e.preventDefault();
          if (this.opts.linebreaks) {
            this.$editor.html(this.selection.getMarkerAsHtml());
            this.selection.restore();
          } else {
            html = '<p><br /></p>';
            this.$editor.html(html);
            this.focus.setStart();
          }
          this.code.sync();
          return false;
        }
      };
    },
    shortcuts: function () {
      return {
        init: function (e, key) {
          // disable browser's hot keys for bold and italic
          if (!this.opts.shortcuts) {
            if ((e.ctrlKey || e.metaKey) && (key === 66 || key === 73))
              e.preventDefault();
            return false;
          }
          $.each(this.opts.shortcuts, $.proxy(function (str, command) {
            var keys = str.split(',');
            var len = keys.length;
            for (var i = 0; i < len; i++) {
              if (typeof keys[i] === 'string') {
                this.shortcuts.handler(e, $.trim(keys[i]), $.proxy(function () {
                  var func;
                  if (command.func.search(/\./) != '-1') {
                    func = command.func.split('.');
                    if (typeof this[func[0]] != 'undefined') {
                      this[func[0]][func[1]].apply(this, command.params);
                    }
                  } else {
                    this[command.func].apply(this, command.params);
                  }
                }, this));
              }
            }
          }, this));
        },
        handler: function (e, keys, origHandler) {
          // based on https://github.com/jeresig/jquery.hotkeys
          var hotkeysSpecialKeys = {
              8: 'backspace',
              9: 'tab',
              10: 'return',
              13: 'return',
              16: 'shift',
              17: 'ctrl',
              18: 'alt',
              19: 'pause',
              20: 'capslock',
              27: 'esc',
              32: 'space',
              33: 'pageup',
              34: 'pagedown',
              35: 'end',
              36: 'home',
              37: 'left',
              38: 'up',
              39: 'right',
              40: 'down',
              45: 'insert',
              46: 'del',
              59: ';',
              61: '=',
              96: '0',
              97: '1',
              98: '2',
              99: '3',
              100: '4',
              101: '5',
              102: '6',
              103: '7',
              104: '8',
              105: '9',
              106: '*',
              107: '+',
              109: '-',
              110: '.',
              111: '/',
              112: 'f1',
              113: 'f2',
              114: 'f3',
              115: 'f4',
              116: 'f5',
              117: 'f6',
              118: 'f7',
              119: 'f8',
              120: 'f9',
              121: 'f10',
              122: 'f11',
              123: 'f12',
              144: 'numlock',
              145: 'scroll',
              173: '-',
              186: ';',
              187: '=',
              188: ',',
              189: '-',
              190: '.',
              191: '/',
              192: '`',
              219: '[',
              220: '\\',
              221: ']',
              222: '\''
            };
          var hotkeysShiftNums = {
              '`': '~',
              '1': '!',
              '2': '@',
              '3': '#',
              '4': '$',
              '5': '%',
              '6': '^',
              '7': '&',
              '8': '*',
              '9': '(',
              '0': ')',
              '-': '_',
              '=': '+',
              ';': ': ',
              '\'': '"',
              ',': '<',
              '.': '>',
              '/': '?',
              '\\': '|'
            };
          keys = keys.toLowerCase().split(' ');
          var special = hotkeysSpecialKeys[e.keyCode], character = String.fromCharCode(e.which).toLowerCase(), modif = '', possible = {};
          $.each([
            'alt',
            'ctrl',
            'meta',
            'shift'
          ], function (index, specialKey) {
            if (e[specialKey + 'Key'] && special !== specialKey) {
              modif += specialKey + '+';
            }
          });
          if (special)
            possible[modif + special] = true;
          if (character) {
            possible[modif + character] = true;
            possible[modif + hotkeysShiftNums[character]] = true;
            // "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
            if (modif === 'shift+') {
              possible[hotkeysShiftNums[character]] = true;
            }
          }
          for (var i = 0, len = keys.length; i < len; i++) {
            if (possible[keys[i]]) {
              e.preventDefault();
              return origHandler.apply(this, arguments);
            }
          }
        }
      };
    },
    line: function () {
      return {
        insert: function () {
          this.buffer.set();
          var blocks = this.selection.getBlocks();
          if (blocks[0] !== false && this.line.isExceptLastOrFirst(blocks)) {
            if (!this.utils.browser('msie'))
              this.$editor.focus();
            return;
          }
          if (this.utils.browser('msie')) {
            this.line.insertInIe();
          } else {
            this.line.insertInOthersBrowsers();
          }
        },
        isExceptLastOrFirst: function (blocks) {
          var exceptTags = [
              'li',
              'td',
              'th',
              'blockquote',
              'figcaption',
              'pre',
              'dl',
              'dt',
              'dd'
            ];
          var first = blocks[0].tagName.toLowerCase();
          var last = this.selection.getLastBlock();
          last = typeof last == 'undefined' ? first : last.tagName.toLowerCase();
          var firstFound = $.inArray(first, exceptTags) != -1;
          var lastFound = $.inArray(last, exceptTags) != -1;
          if (firstFound && lastFound || firstFound) {
            return true;
          }
        },
        insertInIe: function () {
          this.utils.saveScroll();
          this.buffer.set();
          this.insert.node(document.createElement('hr'));
          this.utils.restoreScroll();
          this.code.sync();
        },
        insertInOthersBrowsers: function () {
          this.buffer.set();
          var extra = '<p id="redactor-insert-line"><br /></p>';
          if (this.opts.linebreaks)
            extra = '<br id="redactor-insert-line">';
          document.execCommand('insertHTML', false, '<hr>' + extra);
          this.line.setFocus();
          this.code.sync();
        },
        setFocus: function () {
          var node = this.$editor.find('#redactor-insert-line');
          var next = $(node).next()[0];
          if (next) {
            this.caret.setAfter(node);
            node.remove();
          } else {
            node.removeAttr('id');
          }
        }
      };
    },
    list: function () {
      return {
        toggle: function (cmd) {
          if (!this.utils.browser('msie'))
            this.$editor.focus();
          this.buffer.set();
          this.selection.save();
          var parent = this.selection.getParent();
          var $list = $(parent).closest('ol, ul');
          if (!this.utils.isRedactorParent($list) && $list.size() !== 0) {
            $list = false;
          }
          var isUnorderedCmdOrdered, isOrderedCmdUnordered;
          var remove = false;
          if ($list && $list.length) {
            remove = true;
            var listTag = $list[0].tagName;
            isUnorderedCmdOrdered = cmd === 'orderedlist' && listTag === 'UL';
            isOrderedCmdUnordered = cmd === 'unorderedlist' && listTag === 'OL';
          }
          if (isUnorderedCmdOrdered) {
            this.utils.replaceToTag($list, 'ol');
          } else if (isOrderedCmdUnordered) {
            this.utils.replaceToTag($list, 'ul');
          } else {
            if (remove) {
              this.list.remove(cmd);
            } else {
              this.list.insert(cmd);
            }
          }
          this.selection.restore();
          this.code.sync();
        },
        insert: function (cmd) {
          if (this.utils.browser('msie') && this.opts.linebreaks) {
            this.list.insertInIe(cmd);
          } else {
            document.execCommand('insert' + cmd);
          }
          var parent = this.selection.getParent();
          var $list = $(parent).closest('ol, ul');
          if (this.utils.isEmpty($list.find('li').text())) {
            var $children = $list.children('li');
            $children.find('br').remove();
            $children.append(this.selection.getMarkerAsHtml());
          }
          if ($list.length) {
            // remove block-element list wrapper
            var $listParent = $list.parent();
            if (this.utils.isRedactorParent($listParent) && $listParent[0].tagName != 'LI' && this.utils.isBlock($listParent[0])) {
              $listParent.replaceWith($listParent.contents());
            }
          }
          if (!this.utils.browser('msie')) {
            this.$editor.focus();
          }
          this.clean.clearUnverified();
        },
        insertInIe: function (cmd) {
          var wrapper = this.selection.wrap('div');
          var wrapperHtml = $(wrapper).html();
          var tmpList = cmd == 'orderedlist' ? $('<ol>') : $('<ul>');
          var tmpLi = $('<li>');
          if ($.trim(wrapperHtml) === '') {
            tmpLi.append(this.selection.getMarkerAsHtml());
            tmpList.append(tmpLi);
            this.$editor.find('#selection-marker-1').replaceWith(tmpList);
          } else {
            var items = wrapperHtml.split(/<br\s?\/?>/gi);
            if (items) {
              for (var i = 0; i < items.length; i++) {
                if ($.trim(items[i]) !== '') {
                  tmpList.append($('<li>').html(items[i]));
                }
              }
            } else {
              tmpLi.append(wrapperHtml);
              tmpList.append(tmpLi);
            }
            $(wrapper).replaceWith(tmpList);
          }
        },
        remove: function (cmd) {
          document.execCommand('insert' + cmd);
          var $current = $(this.selection.getCurrent());
          this.indent.fixEmptyIndent();
          if (!this.opts.linebreaks && $current.closest('li, th, td').size() === 0) {
            document.execCommand('formatblock', false, 'p');
            this.$editor.find('ul, ol, blockquote, p').each($.proxy(this.utils.removeEmpty, this));
          }
          var $table = $(this.selection.getCurrent()).closest('table');
          var $prev = $table.prev();
          if (!this.opts.linebreaks && $table.size() !== 0 && $prev.size() !== 0 && $prev[0].tagName == 'BR') {
            $prev.remove();
          }
          this.clean.clearUnverified();
        }
      };
    },
    block: function () {
      return {
        formatting: function (name) {
          var type, value;
          if (typeof this.formatting[name].data != 'undefined')
            type = 'data';
          else if (typeof this.formatting[name].attr != 'undefined')
            type = 'attr';
          else if (typeof this.formatting[name].class != 'undefined')
            type = 'class';
          if (type)
            value = this.formatting[name][type];
          this.block.format(this.formatting[name].tag, type, value);
        },
        format: function (tag, type, value) {
          if (tag == 'quote')
            tag = 'blockquote';
          var formatTags = [
              'p',
              'pre',
              'blockquote',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6'
            ];
          if ($.inArray(tag, formatTags) == -1)
            return;
          this.block.isRemoveInline = tag == 'pre' || tag.search(/h[1-6]/i) != -1;
          // focus
          if (!this.utils.browser('msie'))
            this.$editor.focus();
          this.block.blocks = this.selection.getBlocks();
          this.block.blocksSize = this.block.blocks.length;
          this.block.type = type;
          this.block.value = value;
          this.buffer.set();
          this.selection.save();
          this.block.set(tag);
          this.selection.restore();
          this.code.sync();
        },
        set: function (tag) {
          this.selection.get();
          this.block.containerTag = this.range.commonAncestorContainer.tagName;
          if (this.range.collapsed) {
            this.block.setCollapsed(tag);
          } else {
            this.block.setMultiple(tag);
          }
        },
        setCollapsed: function (tag) {
          var block = this.block.blocks[0];
          if (block === false)
            return;
          if (block.tagName == 'LI') {
            if (tag != 'blockquote')
              return;
            this.block.formatListToBlockquote();
            return;
          }
          var isContainerTable = this.block.containerTag == 'TD' || this.block.containerTag == 'TH';
          if (isContainerTable) {
            if (!this.opts.linebreaks && tag == 'p') {
              document.execCommand('formatblock', false, '<' + tag + '>');
              block = this.selection.getBlock();
              this.block.toggle($(block));
            }
          } else if (block.tagName.toLowerCase() != tag) {
            if (this.opts.linebreaks && tag == 'p') {
              $(block).prepend('<br>').append('<br>');
              this.utils.replaceWithContents(block);
            } else {
              var $formatted = this.utils.replaceToTag(block, tag);
              this.block.toggle($formatted);
              if (tag != 'p' && tag != 'blockquote')
                $formatted.find('img').remove();
              if (this.block.isRemoveInline)
                this.utils.removeInlineTags($formatted);
              if (tag == 'p' || this.block.headTag)
                $formatted.find('p').contents().unwrap();
            }
          } else if (tag == 'blockquote' && block.tagName.toLowerCase() == tag) {
            // blockquote off
            if (this.opts.linebreaks) {
              $(block).prepend('<br>').append('<br>');
              this.utils.replaceWithContents(block);
            } else {
              var $el = this.utils.replaceToTag(block, 'p');
              this.block.toggle($el);
            }
          } else if (block.tagName.toLowerCase() == tag) {
            this.block.toggle($(block));
          }
        },
        setMultiple: function (tag) {
          var block = this.block.blocks[0];
          var isContainerTable = this.block.containerTag == 'TD' || this.block.containerTag == 'TH';
          if (block !== false && this.block.blocksSize === 1) {
            if (block.tagName.toLowerCase() == tag && tag == 'blockquote') {
              // blockquote off
              if (this.opts.linebreaks) {
                $(block).prepend('<br>').append('<br>');
                this.utils.replaceWithContents(block);
              } else {
                var $el = this.utils.replaceToTag(block, 'p');
                this.block.toggle($el);
              }
            } else if (block.tagName == 'LI') {
              if (tag != 'blockquote')
                return;
              this.block.formatListToBlockquote();
            } else if (this.block.containerTag == 'BLOCKQUOTE') {
              this.block.formatBlockquote(tag);
            } else if (this.opts.linebreaks && (isContainerTable || this.range.commonAncestorContainer != block)) {
              this.block.formatWrap(tag);
            } else {
              if (this.opts.linebreaks && tag == 'p') {
                $(block).prepend('<br>').append('<br>');
                this.utils.replaceWithContents(block);
              } else {
                var $formatted = this.utils.replaceToTag(block, tag);
                this.block.toggle($formatted);
                if (this.block.isRemoveInline)
                  this.utils.removeInlineTags($formatted);
                if (tag == 'p' || this.block.headTag)
                  $formatted.find('p').contents().unwrap();
              }
            }
          } else {
            if (this.opts.linebreaks || tag != 'p') {
              if (tag == 'blockquote') {
                var count = 0;
                for (var i = 0; i < this.block.blocksSize; i++) {
                  if (this.block.blocks[i].tagName == 'BLOCKQUOTE')
                    count++;
                }
                // only blockquote selected
                if (count == this.block.blocksSize) {
                  $.each(this.block.blocks, $.proxy(function (i, s) {
                    if (this.opts.linebreaks) {
                      $(s).prepend('<br>').append('<br>');
                      this.utils.replaceWithContents(s);
                    } else {
                      this.utils.replaceToTag(s, 'p');
                    }
                  }, this));
                  return;
                }
              }
              this.block.formatWrap(tag);
            } else {
              var classSize = 0;
              var toggleType = false;
              if (this.block.type == 'class') {
                toggleType = 'toggle';
                classSize = $(this.block.blocks).filter('.' + this.block.value).size();
                if (this.block.blocksSize == classSize)
                  toggleType = 'toggle';
                else if (this.block.blocksSize > classSize)
                  toggleType = 'set';
                else if (classSize === 0)
                  toggleType = 'set';
              }
              var exceptTags = [
                  'ul',
                  'ol',
                  'li',
                  'td',
                  'th',
                  'dl',
                  'dt',
                  'dd'
                ];
              $.each(this.block.blocks, $.proxy(function (i, s) {
                if ($.inArray(s.tagName.toLowerCase(), exceptTags) != -1)
                  return;
                var $formatted = this.utils.replaceToTag(s, tag);
                if (toggleType) {
                  if (toggleType == 'toggle')
                    this.block.toggle($formatted);
                  else if (toggleType == 'remove')
                    this.block.remove($formatted);
                  else if (toggleType == 'set')
                    this.block.set2($formatted);
                } else
                  this.block.toggle($formatted);
                if (tag != 'p' && tag != 'blockquote')
                  $formatted.find('img').remove();
                if (this.block.isRemoveInline)
                  this.utils.removeInlineTags($formatted);
                if (tag == 'p' || this.block.headTag)
                  $formatted.find('p').contents().unwrap();
              }, this));
            }
          }
        },
        toggle: function ($el) {
          if (this.block.type == 'class') {
            $el.toggleClass(this.block.value);
            return;
          } else if (this.block.type == 'attr' || this.block.type == 'data') {
            if ($el.attr(this.block.value.name) == this.block.value.value) {
              $el.removeAttr(this.block.value.name);
            } else {
              $el.attr(this.block.value.name, this.block.value.value);
            }
            return;
          } else {
            $el.removeAttr('style class');
            return;
          }
        },
        remove: function ($el) {
          $el.removeClass(this.block.value);
        },
        formatListToBlockquote: function () {
          var block = $(this.block.blocks[0]).closest('ul, ol');
          $(block).find('ul, ol').contents().unwrap();
          $(block).find('li').append($('<br>')).contents().unwrap();
          var $el = this.utils.replaceToTag(block, 'blockquote');
          this.block.toggle($el);
        },
        formatBlockquote: function (tag) {
          document.execCommand('outdent');
          document.execCommand('formatblock', false, tag);
          this.clean.clearUnverified();
          this.$editor.find('p:empty').remove();
          var formatted = this.selection.getBlock();
          if (tag != 'p') {
            $(formatted).find('img').remove();
          }
          if (!this.opts.linebreaks) {
            this.block.toggle($(formatted));
          }
          this.$editor.find('ul, ol, tr, blockquote, p').each($.proxy(this.utils.removeEmpty, this));
          if (this.opts.linebreaks && tag == 'p') {
            this.utils.replaceWithContents(formatted);
          }
        },
        formatWrap: function (tag) {
          if (this.block.containerTag == 'UL' || this.block.containerTag == 'OL') {
            if (tag == 'blockquote') {
              this.block.formatListToBlockquote();
            } else {
              return;
            }
          }
          var formatted = this.selection.wrap(tag);
          if (formatted === false)
            return;
          var $formatted = $(formatted);
          this.block.formatTableWrapping($formatted);
          var $elements = $formatted.find(this.opts.blockLevelElements.join(',') + ', td, table, thead, tbody, tfoot, th, tr');
          if (this.opts.linebreaks && tag == 'p' || tag == 'pre' || tag == 'blockquote') {
            $elements.append('<br />');
          }
          $elements.contents().unwrap();
          if (tag != 'p' && tag != 'blockquote')
            $formatted.find('img').remove();
          $.each(this.block.blocks, $.proxy(this.utils.removeEmpty, this));
          $formatted.append(this.selection.getMarker(2));
          if (!this.opts.linebreaks) {
            this.block.toggle($formatted);
          }
          this.$editor.find('ul, ol, tr, blockquote, p').each($.proxy(this.utils.removeEmpty, this));
          $formatted.find('blockquote:empty').remove();
          if (this.block.isRemoveInline) {
            this.utils.removeInlineTags($formatted);
          }
          if (this.opts.linebreaks && tag == 'p') {
            this.utils.replaceWithContents($formatted);
          }
        },
        formatTableWrapping: function ($formatted) {
          if ($formatted.closest('table').size() === 0)
            return;
          if ($formatted.closest('tr').size() === 0)
            $formatted.wrap('<tr>');
          if ($formatted.closest('td').size() === 0)
            $formatted.wrap('<td>');
        },
        removeData: function (name, value) {
          var blocks = this.selection.getBlocks();
          $(blocks).removeAttr('data-' + name);
          this.code.sync();
        },
        setData: function (name, value) {
          var blocks = this.selection.getBlocks();
          $(blocks).attr('data-' + name, value);
          this.code.sync();
        },
        toggleData: function (name, value) {
          var blocks = this.selection.getBlocks();
          $.each(blocks, function () {
            if ($(this).attr('data-' + name)) {
              $(this).removeAttr('data-' + name);
            } else {
              $(this).attr('data-' + name, value);
            }
          });
        },
        removeAttr: function (attr, value) {
          var blocks = this.selection.getBlocks();
          $(blocks).removeAttr(attr);
          this.code.sync();
        },
        setAttr: function (attr, value) {
          var blocks = this.selection.getBlocks();
          $(blocks).attr(attr, value);
          this.code.sync();
        },
        toggleAttr: function (attr, value) {
          var blocks = this.selection.getBlocks();
          $.each(blocks, function () {
            if ($(this).attr(name)) {
              $(this).removeAttr(name);
            } else {
              $(this).attr(name, value);
            }
          });
        },
        removeClass: function (className) {
          var blocks = this.selection.getBlocks();
          $(blocks).removeClass(className);
          this.utils.removeEmptyAttr(blocks, 'class');
          this.code.sync();
        },
        setClass: function (className) {
          var blocks = this.selection.getBlocks();
          $(blocks).addClass(className);
          this.code.sync();
        },
        toggleClass: function (className) {
          var blocks = this.selection.getBlocks();
          $(blocks).toggleClass(className);
          this.code.sync();
        }
      };
    },
    inline: function () {
      return {
        formatting: function (name) {
          var type, value;
          if (typeof this.formatting[name].style != 'undefined')
            type = 'style';
          else if (typeof this.formatting[name].class != 'undefined')
            type = 'class';
          if (type)
            value = this.formatting[name][type];
          this.inline.format(this.formatting[name].tag, type, value);
        },
        format: function (tag, type, value) {
          // Stop formatting pre
          if (this.utils.isCurrentOrParent('PRE'))
            return;
          var tags = [
              'b',
              'bold',
              'i',
              'italic',
              'underline',
              'strikethrough',
              'deleted',
              'superscript',
              'subscript'
            ];
          var replaced = [
              'strong',
              'strong',
              'em',
              'em',
              'u',
              'del',
              'del',
              'sup',
              'sub'
            ];
          for (var i = 0; i < tags.length; i++) {
            if (tag == tags[i])
              tag = replaced[i];
          }
          this.inline.type = type || false;
          this.inline.value = value || false;
          this.buffer.set();
          this.$editor.focus();
          this.selection.get();
          if (this.range.collapsed) {
            this.inline.formatCollapsed(tag);
          } else {
            this.inline.formatMultiple(tag);
          }
        },
        formatCollapsed: function (tag) {
          var current = this.selection.getCurrent();
          var $parent = $(current).closest(tag + '[data-redactor-tag=' + tag + ']');
          // inline there is
          if ($parent.size() !== 0) {
            this.caret.setAfter($parent[0]);
            // remove empty
            if (this.utils.isEmpty($parent.text()))
              $parent.remove();
            this.code.sync();
            return;
          }
          // create empty inline
          var node = $('<' + tag + '>').attr('data-verified', 'redactor').attr('data-redactor-tag', tag);
          node.html(this.opts.invisibleSpace);
          node = this.inline.setFormat(node);
          this.insert.node(node);
          this.caret.setEnd(node);
          this.code.sync();
          return;
        },
        formatMultiple: function (tag) {
          this.inline.formatConvert(tag);
          this.selection.save();
          document.execCommand('strikethrough');
          this.$editor.find('strike').each($.proxy(function (i, s) {
            var $el = $(s);
            this.inline.formatRemoveSameChildren($el, tag);
            var $span;
            if (this.inline.type) {
              $span = $('<span>').attr('data-redactor-tag', tag).attr('data-verified', 'redactor');
              $span = this.inline.setFormat($span);
            } else {
              $span = $('<' + tag + '>').attr('data-redactor-tag', tag).attr('data-verified', 'redactor');
            }
            $el.replaceWith($span.html($el.contents()));
            if (tag == 'span') {
              var $parent = $span.parent();
              if ($parent && $parent[0].tagName == 'SPAN' && this.inline.type == 'style') {
                var arr = this.inline.value.split(';');
                for (var z = 0; z < arr.length; z++) {
                  if (arr[z] === '')
                    return;
                  var style = arr[z].split(':');
                  $parent.css(style[0], '');
                  if (this.utils.removeEmptyAttr($parent, 'style')) {
                    $parent.replaceWith($parent.contents());
                  }
                }
              }
            }
          }, this));
          if (tag != 'del') {
            var self = this;
            this.$editor.find('inline').each(function (i, s) {
              self.utils.replaceToTag(s, 'del');
            });
          }
          this.selection.restore();
          this.code.sync();
        },
        formatRemoveSameChildren: function ($el, tag) {
          $el.children(tag).each(function () {
            var $child = $(this);
            if (!$child.hasClass('redactor-selection-marker')) {
              $child.contents().unwrap();
            }
          });
        },
        formatConvert: function (tag) {
          this.selection.save();
          var find = '';
          if (this.inline.type == 'class')
            find = '[data-redactor-class=' + this.inline.value + ']';
          else if (this.inline.type == 'style') {
            find = '[data-redactor-style="' + this.inline.value + '"]';
          }
          if (tag != 'del') {
            var self = this;
            this.$editor.find('del').each(function (i, s) {
              self.utils.replaceToTag(s, 'inline');
            });
          }
          this.$editor.find('[data-redactor-tag="' + tag + '"]' + find).each(function () {
            if (find === '' && tag == 'span' && this.tagName.toLowerCase() == tag)
              return;
            var $el = $(this);
            $el.replaceWith($('<strike />').html($el.contents()));
          });
          this.selection.restore();
        },
        setFormat: function (node) {
          switch (this.inline.type) {
          case 'class':
            if (node.hasClass(this.inline.value)) {
              node.removeClass(this.inline.value);
              node.removeAttr('data-redactor-class');
            } else {
              node.addClass(this.inline.value);
              node.attr('data-redactor-class', this.inline.value);
            }
            break;
          case 'style':
            node[0].style.cssText = this.inline.value;
            node.attr('data-redactor-style', this.inline.value);
            break;
          }
          return node;
        },
        removeStyle: function () {
          this.buffer.set();
          var current = this.selection.getCurrent();
          var nodes = this.selection.getInlines();
          this.selection.save();
          if (current && current.tagName === 'SPAN') {
            var $s = $(current);
            $s.removeAttr('style');
            if ($s[0].attributes.length === 0) {
              $s.replaceWith($s.contents());
            }
          }
          $.each(nodes, $.proxy(function (i, s) {
            var $s = $(s);
            if ($.inArray(s.tagName.toLowerCase(), this.opts.inlineTags) != -1 && !$s.hasClass('redactor-selection-marker')) {
              $s.removeAttr('style');
              if ($s[0].attributes.length === 0) {
                $s.replaceWith($s.contents());
              }
            }
          }, this));
          this.selection.restore();
          this.code.sync();
        },
        removeStyleRule: function (name) {
          this.buffer.set();
          var parent = this.selection.getParent();
          var nodes = this.selection.getInlines();
          this.selection.save();
          if (parent && parent.tagName === 'SPAN') {
            var $s = $(parent);
            $s.css(name, '');
            this.utils.removeEmptyAttr($s, 'style');
            if ($s[0].attributes.length === 0) {
              $s.replaceWith($s.contents());
            }
          }
          $.each(nodes, $.proxy(function (i, s) {
            var $s = $(s);
            if ($.inArray(s.tagName.toLowerCase(), this.opts.inlineTags) != -1 && !$s.hasClass('redactor-selection-marker')) {
              $s.css(name, '');
              this.utils.removeEmptyAttr($s, 'style');
              if ($s[0].attributes.length === 0) {
                $s.replaceWith($s.contents());
              }
            }
          }, this));
          this.selection.restore();
          this.code.sync();
        },
        removeFormat: function () {
          this.buffer.set();
          var current = this.selection.getCurrent();
          this.selection.save();
          document.execCommand('removeFormat');
          if (current && current.tagName === 'SPAN') {
            $(current).replaceWith($(current).contents());
          }
          $.each(this.selection.getNodes(), $.proxy(function (i, s) {
            var $s = $(s);
            if ($.inArray(s.tagName.toLowerCase(), this.opts.inlineTags) != -1 && !$s.hasClass('redactor-selection-marker')) {
              $s.replaceWith($s.contents());
            }
          }, this));
          this.selection.restore();
          this.code.sync();
        },
        toggleClass: function (className) {
          this.inline.format('span', 'class', className);
        },
        toggleStyle: function (value) {
          this.inline.format('span', 'style', value);
        }
      };
    },
    insert: function () {
      return {
        set: function (html, clean) {
          this.placeholder.remove();
          html = this.clean.setVerified(html);
          if (typeof clean == 'undefined') {
            html = this.clean.onPaste(html, false);
          }
          this.$editor.html(html);
          this.selection.remove();
          this.focus.setEnd();
          this.clean.normalizeLists();
          this.code.sync();
          this.observe.load();
          if (typeof clean == 'undefined') {
            setTimeout($.proxy(this.clean.clearUnverified, this), 10);
          }
        },
        text: function (text) {
          this.placeholder.remove();
          text = text.toString();
          text = $.trim(text);
          text = this.clean.getPlainText(text, false);
          this.$editor.focus();
          if (this.utils.browser('msie')) {
            this.insert.htmlIe(text);
          } else {
            this.selection.get();
            this.range.deleteContents();
            var el = document.createElement('div');
            el.innerHTML = text;
            var frag = document.createDocumentFragment(), node, lastNode;
            while (node = el.firstChild) {
              lastNode = frag.appendChild(node);
            }
            this.range.insertNode(frag);
            if (lastNode) {
              var range = this.range.cloneRange();
              range.setStartAfter(lastNode);
              range.collapse(true);
              this.sel.removeAllRanges();
              this.sel.addRange(range);
            }
          }
          this.code.sync();
          this.clean.clearUnverified();
        },
        html: function (html, clean) {
          this.placeholder.remove();
          if (typeof clean == 'undefined')
            clean = true;
          this.$editor.focus();
          html = this.clean.setVerified(html);
          if (clean) {
            html = this.clean.onPaste(html);
          }
          if (this.utils.browser('msie')) {
            this.insert.htmlIe(html);
          } else {
            if (this.clean.singleLine)
              this.insert.execHtml(html);
            else
              document.execCommand('insertHTML', null, html);
            this.insert.htmlFixMozilla();
          }
          this.clean.normalizeLists();
          // remove empty paragraphs finaly
          if (!this.opts.linebreaks) {
            this.$editor.find('p').each($.proxy(this.utils.removeEmpty, this));
          }
          this.code.sync();
          this.observe.load();
          if (clean) {
            this.clean.clearUnverified();
          }
        },
        htmlFixMozilla: function () {
          // FF inserts empty p when content was selected dblclick
          if (!this.utils.browser('mozilla'))
            return;
          var $next = $(this.selection.getBlock()).next();
          if ($next.length > 0 && $next[0].tagName == 'P' && $next.html() === '') {
            $next.remove();
          }
        },
        htmlIe: function (html) {
          if (this.utils.isIe11()) {
            var parent = this.utils.isCurrentOrParent('P');
            var $html = $('<div>').append(html);
            var blocksMatch = $html.contents().is('p, :header, dl, ul, ol, div, table, td, blockquote, pre, address, section, header, footer, aside, article');
            if (parent && blocksMatch)
              this.insert.ie11FixInserting(parent, html);
            else
              this.insert.ie11PasteFrag(html);
            return;
          }
          document.selection.createRange().pasteHTML(html);
        },
        execHtml: function (html) {
          html = this.clean.setVerified(html);
          this.selection.get();
          this.range.deleteContents();
          var el = document.createElement('div');
          el.innerHTML = html;
          var frag = document.createDocumentFragment(), node, lastNode;
          while (node = el.firstChild) {
            lastNode = frag.appendChild(node);
          }
          this.range.insertNode(frag);
          this.range.collapse(true);
          this.caret.setAfter(lastNode);
        },
        node: function (node) {
          node = node[0] || node;
          this.selection.get();
          this.range.deleteContents();
          this.range.insertNode(node);
          this.range.collapse(false);
          this.selection.addRange();
          return node;
        },
        nodeToPoint: function (node, x, y) {
          node = node[0] || node;
          this.selection.get();
          var range;
          if (document.caretPositionFromPoint) {
            var pos = document.caretPositionFromPoint(x, y);
            this.range.setStart(pos.offsetNode, pos.offset);
            this.range.collapse(true);
            this.range.insertNode(node);
          } else if (document.caretRangeFromPoint) {
            range = document.caretRangeFromPoint(x, y);
            range.insertNode(node);
          } else if (typeof document.body.createTextRange != 'undefined') {
            range = document.body.createTextRange();
            range.moveToPoint(x, y);
            var endRange = range.duplicate();
            endRange.moveToPoint(x, y);
            range.setEndPoint('EndToEnd', endRange);
            range.select();
          }
        },
        nodeToCaretPositionFromPoint: function (e, node) {
          node = node[0] || node;
          var range;
          var x = e.clientX, y = e.clientY;
          if (document.caretPositionFromPoint) {
            var pos = document.caretPositionFromPoint(x, y);
            var sel = document.getSelection();
            range = sel.getRangeAt(0);
            range.setStart(pos.offsetNode, pos.offset);
            range.collapse(true);
            range.insertNode(node);
          } else if (document.caretRangeFromPoint) {
            range = document.caretRangeFromPoint(x, y);
            range.insertNode(node);
          } else if (typeof document.body.createTextRange != 'undefined') {
            range = document.body.createTextRange();
            range.moveToPoint(x, y);
            var endRange = range.duplicate();
            endRange.moveToPoint(x, y);
            range.setEndPoint('EndToEnd', endRange);
            range.select();
          }
        },
        ie11FixInserting: function (parent, html) {
          var node = document.createElement('span');
          node.className = 'redactor-ie-paste';
          this.insert.node(node);
          var parHtml = $(parent).html();
          parHtml = '<p>' + parHtml.replace(/<span class="redactor-ie-paste"><\/span>/gi, '</p>' + html + '<p>') + '</p>';
          $(parent).replaceWith(parHtml);
        },
        ie11PasteFrag: function (html) {
          this.selection.get();
          this.range.deleteContents();
          var el = document.createElement('div');
          el.innerHTML = html;
          var frag = document.createDocumentFragment(), node, lastNode;
          while (node = el.firstChild) {
            lastNode = frag.appendChild(node);
          }
          this.range.insertNode(frag);
        }
      };
    },
    caret: function () {
      return {
        setStart: function (node) {
          // inline tag
          if (!this.utils.isBlock(node)) {
            var space = this.utils.createSpaceElement();
            $(node).prepend(space);
            this.caret.setEnd(space);
          } else {
            this.caret.set(node, 0, node, 0);
          }
        },
        setEnd: function (node) {
          this.caret.set(node, 1, node, 1);
        },
        set: function (orgn, orgo, focn, foco) {
          // focus
          if (!this.utils.browser('msie'))
            this.$editor.focus();
          orgn = orgn[0] || orgn;
          focn = focn[0] || focn;
          if (this.utils.isBlockTag(orgn.tagName) && orgn.innerHTML === '') {
            orgn.innerHTML = this.opts.invisibleSpace;
          }
          if (orgn.tagName == 'BR' && this.opts.linebreaks === false) {
            var par = $(this.opts.emptyHtml)[0];
            $(orgn).replaceWith(par);
            orgn = par;
            focn = orgn;
          }
          this.selection.get();
          try {
            this.range.setStart(orgn, orgo);
            this.range.setEnd(focn, foco);
          } catch (e) {
          }
          this.selection.addRange();
        },
        setAfter: function (node) {
          var tag = $(node)[0].tagName;
          // inline tag
          if (tag != 'BR' && !this.utils.isBlock(node)) {
            var space = this.utils.createSpaceElement();
            $(node).after(space);
            this.caret.setEnd(space);
          } else {
            if (tag != 'BR' && this.utils.browser('msie')) {
              this.caret.setStart($(node).next());
            } else {
              this.caret.setAfterOrBefore(node, 'after');
            }
          }
        },
        setBefore: function (node) {
          // block tag
          if (this.utils.isBlock(node)) {
            this.caret.setEnd($(node).prev());
          } else {
            this.caret.setAfterOrBefore(node, 'before');
          }
        },
        setAfterOrBefore: function (node, type) {
          // focus
          if (!this.utils.browser('msie'))
            this.$editor.focus();
          node = node[0] || node;
          this.selection.get();
          if (type == 'after') {
            try {
              this.range.setStartAfter(node);
              this.range.setEndAfter(node);
            } catch (e) {
            }
          } else {
            try {
              this.range.setStartBefore(node);
              this.range.setEndBefore(node);
            } catch (e) {
            }
          }
          this.range.collapse(false);
          this.selection.addRange();
        },
        getOffsetOfElement: function (node) {
          node = node[0] || node;
          this.selection.get();
          var cloned = this.range.cloneRange();
          cloned.selectNodeContents(node);
          cloned.setEnd(this.range.endContainer, this.range.endOffset);
          return $.trim(cloned.toString()).length;
        },
        getOffset: function () {
          var offset = 0;
          var sel = window.getSelection();
          if (sel.rangeCount > 0) {
            var range = window.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(this.$editor[0]);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            offset = preCaretRange.toString().length;
          }
          return offset;
        },
        setOffset: function (start, end) {
          if (typeof end == 'undefined')
            end = start;
          if (!this.focus.isFocused())
            this.focus.setStart();
          var range = document.createRange();
          var sel = document.getSelection();
          var node, offset = 0;
          var walker = document.createTreeWalker(this.$editor[0], NodeFilter.SHOW_TEXT, null, null);
          while (node = walker.nextNode()) {
            offset += node.nodeValue.length;
            if (offset > start) {
              range.setStart(node, node.nodeValue.length + start - offset);
              start = Infinity;
            }
            if (offset >= end) {
              range.setEnd(node, node.nodeValue.length + end - offset);
              break;
            }
          }
          sel.removeAllRanges();
          sel.addRange(range);
        },
        setToPoint: function (start, end) {
          this.caret.setOffset(start, end);
        },
        getCoords: function () {
          return this.caret.getOffset();
        }
      };
    },
    selection: function () {
      return {
        get: function () {
          this.sel = document.getSelection();
          if (document.getSelection && this.sel.getRangeAt && this.sel.rangeCount) {
            this.range = this.sel.getRangeAt(0);
          } else {
            this.range = document.createRange();
          }
        },
        addRange: function () {
          try {
            this.sel.removeAllRanges();
          } catch (e) {
          }
          this.sel.addRange(this.range);
        },
        getCurrent: function () {
          var el = false;
          this.selection.get();
          if (this.sel && this.sel.rangeCount > 0) {
            el = this.sel.getRangeAt(0).startContainer;
          }
          return this.utils.isRedactorParent(el);
        },
        getParent: function (elem) {
          elem = elem || this.selection.getCurrent();
          if (elem) {
            return this.utils.isRedactorParent($(elem).parent()[0]);
          }
          return false;
        },
        getBlock: function (node) {
          node = node || this.selection.getCurrent();
          while (node) {
            if (this.utils.isBlockTag(node.tagName)) {
              return $(node).hasClass('redactor-editor') ? false : node;
            }
            node = node.parentNode;
          }
          return false;
        },
        getInlines: function (nodes) {
          this.selection.get();
          if (this.range && this.range.collapsed) {
            return false;
          }
          var inlines = [];
          nodes = typeof nodes == 'undefined' ? this.selection.getNodes() : nodes;
          var inlineTags = this.opts.inlineTags;
          inlineTags.push('span');
          $.each(nodes, $.proxy(function (i, node) {
            if ($.inArray(node.tagName.toLowerCase(), inlineTags) != -1) {
              inlines.push(node);
            }
          }, this));
          return inlines.length === 0 ? false : inlines;
        },
        getBlocks: function (nodes) {
          this.selection.get();
          if (this.range && this.range.collapsed) {
            return [this.selection.getBlock()];
          }
          var blocks = [];
          nodes = typeof nodes == 'undefined' ? this.selection.getNodes() : nodes;
          $.each(nodes, $.proxy(function (i, node) {
            if (this.utils.isBlock(node)) {
              this.selection.lastBlock = node;
              blocks.push(node);
            }
          }, this));
          return blocks.length === 0 ? [this.selection.getBlock()] : blocks;
        },
        getLastBlock: function () {
          return this.selection.lastBlock;
        },
        getNodes: function () {
          this.selection.get();
          var startNode = this.selection.getNodesMarker(1);
          var endNode = this.selection.getNodesMarker(2);
          this.selection.setNodesMarker(this.range, startNode, true);
          if (this.range.collapsed === false) {
            this.selection.setNodesMarker(this.range, endNode, false);
          } else {
            endNode = startNode;
          }
          var nodes = [];
          var counter = 0;
          var self = this;
          this.$editor.find('*').each(function () {
            if (this == startNode) {
              var parent = $(this).parent();
              if (parent.length !== 0 && parent[0].tagName != 'BODY' && self.utils.isRedactorParent(parent[0])) {
                nodes.push(parent[0]);
              }
              nodes.push(this);
              counter = 1;
            } else {
              if (counter > 0) {
                nodes.push(this);
                counter = counter + 1;
              }
            }
            if (this == endNode) {
              return false;
            }
          });
          var finalNodes = [];
          var len = nodes.length;
          for (var i = 0; i < len; i++) {
            if (nodes[i].id != 'nodes-marker-1' && nodes[i].id != 'nodes-marker-2') {
              finalNodes.push(nodes[i]);
            }
          }
          this.selection.removeNodesMarkers();
          return finalNodes;
        },
        getNodesMarker: function (num) {
          return $('<span id="nodes-marker-' + num + '" class="redactor-nodes-marker" data-verified="redactor">' + this.opts.invisibleSpace + '</span>')[0];
        },
        setNodesMarker: function (range, node, type) {
          range = range.cloneRange();
          try {
            range.collapse(type);
            range.insertNode(node);
          } catch (e) {
          }
        },
        removeNodesMarkers: function () {
          $(document).find('span.redactor-nodes-marker').remove();
          this.$editor.find('span.redactor-nodes-marker').remove();
        },
        fromPoint: function (start, end) {
          this.caret.setOffset(start, end);
        },
        wrap: function (tag) {
          this.selection.get();
          if (this.range.collapsed)
            return false;
          var wrapper = document.createElement(tag);
          wrapper.appendChild(this.range.extractContents());
          this.range.insertNode(wrapper);
          return wrapper;
        },
        selectElement: function (node) {
          this.caret.set(node, 0, node, 1);
        },
        selectAll: function () {
          this.selection.get();
          this.range.selectNodeContents(this.$editor[0]);
          this.selection.addRange();
        },
        remove: function () {
          this.selection.get();
          this.sel.removeAllRanges();
        },
        save: function () {
          this.selection.createMarkers();
        },
        createMarkers: function () {
          this.selection.get();
          var node1 = this.selection.getMarker(1);
          this.selection.setMarker(this.range, node1, true);
          if (this.range.collapsed === false) {
            var node2 = this.selection.getMarker(2);
            this.selection.setMarker(this.range, node2, false);
          }
          this.savedSel = this.$editor.html();
        },
        getMarker: function (num) {
          if (typeof num == 'undefined')
            num = 1;
          return $('<span id="selection-marker-' + num + '" class="redactor-selection-marker"  data-verified="redactor">' + this.opts.invisibleSpace + '</span>')[0];
        },
        getMarkerAsHtml: function (num) {
          return this.utils.getOuterHtml(this.selection.getMarker(num));
        },
        setMarker: function (range, node, type) {
          range = range.cloneRange();
          try {
            range.collapse(type);
            range.insertNode(node);
          } catch (e) {
            this.focus.setStart();
          }
        },
        restore: function () {
          var node1 = this.$editor.find('span#selection-marker-1');
          var node2 = this.$editor.find('span#selection-marker-2');
          if (node1.length !== 0 && node2.length !== 0) {
            this.caret.set(node1, 0, node2, 0);
          } else if (node1.length !== 0) {
            this.caret.set(node1, 0, node1, 0);
          } else {
            this.$editor.focus();
          }
          this.selection.removeMarkers();
          this.savedSel = false;
        },
        removeMarkers: function () {
          this.$editor.find('span.redactor-selection-marker').remove();
        },
        getText: function () {
          this.selection.get();
          return this.sel.toString();
        },
        getHtml: function () {
          var html = '';
          this.selection.get();
          if (this.sel.rangeCount) {
            var container = document.createElement('div');
            var len = this.sel.rangeCount;
            for (var i = 0; i < len; ++i) {
              container.appendChild(this.sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
          }
          return this.clean.onSync(html);
        }
      };
    },
    observe: function () {
      return {
        load: function () {
          this.observe.images();
          this.observe.links();
        },
        buttons: function (e, btnName) {
          var current = this.selection.getCurrent();
          var parent = this.selection.getParent();
          this.button.setInactiveAll(btnName);
          if (e === false && btnName !== 'html') {
            if ($.inArray(btnName, this.opts.activeButtons) != -1)
              this.button.toggleActive(btnName);
            return;
          }
          var linkButtonName = this.utils.isCurrentOrParent('A') ? this.lang.get('link_edit') : this.lang.get('link_insert');
          $('body').find('a.redactor-dropdown-link').text(linkButtonName);
          $.each(this.opts.activeButtonsStates, $.proxy(function (key, value) {
            var parentEl = $(parent).closest(key);
            var currentEl = $(current).closest(key);
            if (!this.utils.isRedactorParent(parentEl))
              return;
            if (!this.utils.isRedactorParent(currentEl))
              return;
            if (parentEl.length !== 0 || currentEl.closest(key).length !== 0) {
              this.button.setActive(value);
            }
          }, this));
          var $parent = $(parent).closest(this.opts.alignmentTags.toString().toLowerCase());
          if (this.utils.isRedactorParent(parent) && $parent.length) {
            var align = $parent.css('text-align') === '' ? 'left' : $parent.css('text-align');
            this.button.setActive('align' + align);
          }
        },
        addButton: function (tag, btnName) {
          this.opts.activeButtons.push(btnName);
          this.opts.activeButtonsStates[tag] = btnName;
        },
        images: function () {
          this.$editor.find('img').each($.proxy(function (i, img) {
            var $img = $(img);
            // IE fix (when we clicked on an image and then press backspace IE does goes to image's url)
            $img.closest('a').on('click', function (e) {
              e.preventDefault();
            });
            if (this.utils.browser('msie'))
              $img.attr('unselectable', 'on');
            this.image.setEditable($img);
          }, this));
          $(document).on('click.redactor-image-delete', $.proxy(function (e) {
            this.observe.image = false;
            if (e.target.tagName == 'IMG' && this.utils.isRedactorParent(e.target)) {
              this.observe.image = this.observe.image && this.observe.image == e.target ? false : e.target;
            }
          }, this));
        },
        links: function () {
          if (!this.opts.linkTooltip)
            return;
          this.$editor.find('a').on('touchstart click', $.proxy(this.observe.showTooltip, this));
          this.$editor.on('touchstart click.redactor', $.proxy(this.observe.closeTooltip, this));
          $(document).on('touchstart click.redactor', $.proxy(this.observe.closeTooltip, this));
        },
        getTooltipPosition: function ($link) {
          return $link.offset();
        },
        showTooltip: function (e) {
          var $link = $(e.target);
          if ($link.size() === 0 || $link[0].tagName !== 'A')
            return;
          var pos = this.observe.getTooltipPosition($link);
          var tooltip = $('<span class="redactor-link-tooltip"></span>');
          var href = $link.attr('href');
          if (href === undefined) {
            href = '';
          }
          if (href.length > 24)
            href = href.substring(0, 24) + '...';
          var aLink = $('<a href="' + $link.attr('href') + '" target="_blank" />').html(href).addClass('redactor-link-tooltip-action');
          var aEdit = $('<a href="#" />').html(this.lang.get('edit')).on('click', $.proxy(this.link.show, this)).addClass('redactor-link-tooltip-action');
          var aUnlink = $('<a href="#" />').html(this.lang.get('unlink')).on('click', $.proxy(this.link.unlink, this)).addClass('redactor-link-tooltip-action');
          tooltip.append(aLink).append(' | ').append(aEdit).append(' | ').append(aUnlink);
          tooltip.css({
            top: pos.top + 20 + 'px',
            left: pos.left + 'px'
          });
          $('.redactor-link-tooltip').remove();
          $('body').append(tooltip);
        },
        closeTooltip: function (e) {
          e = e.originalEvent || e;
          if (e.target.tagName == 'A' && !$(e.target).hasClass('redactor-link-tooltip-action') && this.utils.isRedactorParent(e.target)) {
            return;
          }
          $('.redactor-link-tooltip').remove();
        }
      };
    },
    link: function () {
      return {
        show: function (e) {
          if (typeof e != 'undefined' && e.preventDefault)
            e.preventDefault();
          this.modal.load('link', this.lang.get('link_insert'), 600);
          this.modal.createCancelButton();
          this.link.buttonInsert = this.modal.createActionButton(this.lang.get('insert'));
          this.selection.get();
          this.link.getData();
          this.link.cleanUrl();
          if (this.link.target == '_blank')
            $('#redactor-link-blank').prop('checked', true);
          this.link.$inputUrl = $('#redactor-link-url');
          this.link.$inputText = $('#redactor-link-url-text');
          this.link.$inputText.val(this.link.text);
          this.link.$inputUrl.val(this.link.url);
          this.link.buttonInsert.on('click', $.proxy(this.link.insert, this));
          // show modal
          this.selection.save();
          this.modal.show();
          this.link.$inputUrl.focus();
        },
        cleanUrl: function () {
          var thref = self.location.href.replace(/\/$/i, '');
          this.link.url = this.link.url.replace(thref, '');
          this.link.url = this.link.url.replace(/^\/#/, '#');
          this.link.url = this.link.url.replace('mailto:', '');
          // remove host from href
          if (!this.opts.linkProtocol) {
            var re = new RegExp('^(http|ftp|https)://' + self.location.host, 'i');
            this.link.url = this.link.url.replace(re, '');
          }
        },
        getData: function () {
          this.link.$node = false;
          var $el = $(this.selection.getCurrent()).closest('a');
          if ($el.size() !== 0 && $el[0].tagName === 'A') {
            this.link.$node = $el;
            this.link.url = $el.attr('href');
            this.link.text = $el.text();
            this.link.target = $el.attr('target');
          } else {
            this.link.text = this.sel.toString();
            this.link.url = '';
            this.link.target = '';
          }
        },
        insert: function () {
          var target = '';
          var link = this.link.$inputUrl.val();
          var text = this.link.$inputText.val();
          if ($.trim(link) === '') {
            this.link.$inputUrl.addClass('redactor-input-error').on('keyup', function () {
              $(this).removeClass('redactor-input-error');
              $(this).off('keyup');
            });
            return;
          }
          // mailto
          if (link.search('@') != -1 && /(http|ftp|https):\/\//i.test(link) === false) {
            link = 'mailto:' + link;
          }  // url, not anchor
          else if (link.search('#') !== 0) {
            if ($('#redactor-link-blank').prop('checked')) {
              target = '_blank';
            }
            // test url (add protocol)
            var pattern = '((xn--)?[a-z0-9]+(-[a-z0-9]+)*\\.)+[a-z]{2,}';
            var re = new RegExp('^(http|ftp|https)://' + pattern, 'i');
            var re2 = new RegExp('^' + pattern, 'i');
            if (link.search(re) == -1 && link.search(re2) === 0 && this.opts.linkProtocol) {
              link = this.opts.linkProtocol + '://' + link;
            }
          }
          this.link.set(text, link, target);
          this.modal.close();
        },
        set: function (text, link, target) {
          text = $.trim(text.replace(/<|>/g, ''));
          this.selection.restore();
          if (text === '' && link === '')
            return;
          if (text === '' && link !== '')
            text = link;
          if (this.link.$node) {
            this.buffer.set();
            this.link.$node.text(text).attr('href', link);
            if (target !== '') {
              this.link.$node.attr('target', target);
            } else {
              this.link.$node.removeAttr('target');
            }
            this.code.sync();
          } else {
            if (this.utils.browser('mozilla') && this.link.text === '') {
              var $a = $('<a />').attr('href', link).text(text);
              if (target !== '')
                $a.attr('target', target);
              this.insert.node($a);
              this.selection.selectElement($a);
            } else {
              document.execCommand('createLink', false, link);
              var $a = $(this.selection.getCurrent()).closest('a');
              if (target !== '')
                $a.attr('target', target);
              $a.removeAttr('style');
              if (this.link.text === '') {
                $a.text(text);
                this.selection.selectElement($a);
              }
            }
            this.code.sync();
            this.core.setCallback('insertedLink', $a);
          }
          // link tooltip
          setTimeout($.proxy(function () {
            this.observe.links();
          }, this), 5);
        },
        unlink: function (e) {
          if (typeof e != 'undefined' && e.preventDefault)
            e.preventDefault();
          var nodes = this.selection.getNodes();
          if (!nodes)
            return;
          this.buffer.set();
          var len = nodes.length;
          for (var i = 0; i < len; i++) {
            if (nodes[i].tagName == 'A') {
              var $node = $(nodes[i]);
              $node.replaceWith($node.contents());
            }
          }
          // remove tooltip
          $('.redactor-link-tooltip').remove();
          this.code.sync();
        }
      };
    },
    image: function () {
      return {
        show: function () {
          this.modal.load('image', this.lang.get('image'), 700);
          this.upload.init('#redactor-modal-image-droparea', this.opts.imageUpload, this.image.insert);
          this.selection.save();
          this.modal.show();
        },
        showEdit: function ($image) {
          var $link = $image.closest('a');
          this.modal.load('imageEdit', this.lang.get('edit'), 705);
          this.modal.createCancelButton();
          this.image.buttonDelete = this.modal.createDeleteButton(this.lang.get('_delete'));
          this.image.buttonSave = this.modal.createActionButton(this.lang.get('save'));
          this.image.buttonDelete.on('click', $.proxy(function () {
            this.image.remove($image);
          }, this));
          this.image.buttonSave.on('click', $.proxy(function () {
            this.image.update($image);
          }, this));
          $('#redactor-image-title').val($image.attr('alt'));
          if (!this.opts.imageLink)
            $('.redactor-image-link-option').hide();
          else {
            var $redactorImageLink = $('#redactor-image-link');
            $redactorImageLink.attr('href', $image.attr('src'));
            if ($link.size() !== 0) {
              $redactorImageLink.val($link.attr('href'));
              if ($link.attr('target') == '_blank')
                $('#redactor-image-link-blank').prop('checked', true);
            }
          }
          if (!this.opts.imagePosition)
            $('.redactor-image-position-option').hide();
          else {
            var floatValue = $image.css('display') == 'block' && $image.css('float') == 'none' ? 'center' : $image.css('float');
            $('#redactor-image-align').val(floatValue);
          }
          this.modal.show();
        },
        setFloating: function ($image) {
          var floating = $('#redactor-image-align').val();
          var imageFloat = '';
          var imageDisplay = '';
          var imageMargin = '';
          switch (floating) {
          case 'left':
            imageFloat = 'left';
            imageMargin = '0 ' + this.opts.imageFloatMargin + ' ' + this.opts.imageFloatMargin + ' 0';
            break;
          case 'right':
            imageFloat = 'right';
            imageMargin = '0 0 ' + this.opts.imageFloatMargin + ' ' + this.opts.imageFloatMargin;
            break;
          case 'center':
            imageDisplay = 'block';
            imageMargin = 'auto';
            break;
          }
          $image.css({
            'float': imageFloat,
            display: imageDisplay,
            margin: imageMargin
          });
          $image.attr('rel', $image.attr('style'));
        },
        update: function ($image) {
          this.image.hideResize();
          this.buffer.set();
          var $link = $image.closest('a');
          $image.attr('alt', $('#redactor-image-title').val());
          this.image.setFloating($image);
          // as link
          var link = $.trim($('#redactor-image-link').val());
          if (link !== '') {
            var target = $('#redactor-image-link-blank').prop('checked') ? true : false;
            if ($link.size() === 0) {
              var a = $('<a href="' + link + '">' + this.utils.getOuterHtml($image) + '</a>');
              if (target)
                a.attr('target', '_blank');
              $image.replaceWith(a);
            } else {
              $link.attr('href', link);
              if (target) {
                $link.attr('target', '_blank');
              } else {
                $link.removeAttr('target');
              }
            }
          } else if ($link.size() !== 0) {
            $link.replaceWith(this.utils.getOuterHtml($image));
          }
          this.modal.close();
          this.observe.images();
          this.code.sync();
        },
        setEditable: function ($image) {
          if (!this.opts.imageEditable)
            return;
          $image.on('dragstart', $.proxy(this.image.onDrag, this));
          $image.on('mousedown', $.proxy(this.image.hideResize, this));
          $image.on('click touchstart', $.proxy(function (e) {
            this.observe.image = $image;
            if (this.$editor.find('#redactor-image-box').size() !== 0)
              return false;
            this.image.resizer = this.image.loadEditableControls($image);
            $(document).on('click.redactor-image-resize-hide', $.proxy(this.image.hideResize, this));
            this.$editor.on('click.redactor-image-resize-hide', $.proxy(this.image.hideResize, this));
            // resize
            if (!this.opts.imageResizable)
              return;
            this.image.resizer.on('mousedown.redactor touchstart.redactor', $.proxy(function (e) {
              e.preventDefault();
              this.image.resizeHandle = {
                x: e.pageX,
                y: e.pageY,
                el: $image,
                ratio: $image.width() / $image.height(),
                h: $image.height()
              };
              e = e.originalEvent || e;
              if (e.targetTouches) {
                this.image.resizeHandle.x = e.targetTouches[0].pageX;
                this.image.resizeHandle.y = e.targetTouches[0].pageY;
              }
              this.image.startResize();
            }, this));
          }, this));
        },
        startResize: function () {
          $(document).on('mousemove.redactor-image-resize touchmove.redactor-image-resize', $.proxy(this.image.moveResize, this));
          $(document).on('mouseup.redactor-image-resize touchend.redactor-image-resize', $.proxy(this.image.stopResize, this));
        },
        moveResize: function (e) {
          e.preventDefault();
          e = e.originalEvent || e;
          var height = this.image.resizeHandle.h;
          if (e.targetTouches)
            height += e.targetTouches[0].pageY - this.image.resizeHandle.y;
          else
            height += e.pageY - this.image.resizeHandle.y;
          var width = Math.round(height * this.image.resizeHandle.ratio);
          if (height < 50 || width < 100)
            return;
          this.image.resizeHandle.el.height(height);
          this.image.resizeHandle.el.width(width);
          this.code.sync();
        },
        stopResize: function () {
          this.handle = false;
          $(document).off('.redactor-image-resize');
          this.image.hideResize();
        },
        onDrag: function (e) {
          if (this.$editor.find('#redactor-image-box').size() !== 0) {
            e.preventDefault();
            return false;
          }
          this.$editor.on('drop.redactor-image-inside-drop', $.proxy(function () {
            setTimeout($.proxy(this.image.onDrop, this), 1);
          }, this));
        },
        onDrop: function () {
          this.image.fixImageSourceAfterDrop();
          this.observe.images();
          this.$editor.off('drop.redactor-image-inside-drop');
          this.clean.clearUnverified();
          this.code.sync();
        },
        fixImageSourceAfterDrop: function () {
          this.$editor.find('img[data-save-url]').each(function () {
            var $el = $(this);
            $el.attr('src', $el.attr('data-save-url'));
            $el.removeAttr('data-save-url');
          });
        },
        hideResize: function (e) {
          if (e && $(e.target).closest('#redactor-image-box').length !== 0)
            return;
          if (e && e.target.tagName == 'IMG') {
            var $image = $(e.target);
            $image.attr('data-save-url', $image.attr('src'));
          }
          var imageBox = this.$editor.find('#redactor-image-box');
          if (imageBox.size() === 0)
            return;
          this.image.editter.remove();
          $(this.image.resizer).remove();
          imageBox.find('img').css({
            marginTop: imageBox[0].style.marginTop,
            marginBottom: imageBox[0].style.marginBottom,
            marginLeft: imageBox[0].style.marginLeft,
            marginRight: imageBox[0].style.marginRight
          });
          imageBox.css('margin', '');
          imageBox.find('img').css('opacity', '');
          imageBox.replaceWith(function () {
            return $(this).contents();
          });
          $(document).off('click.redactor-image-resize-hide');
          this.$editor.off('click.redactor-image-resize-hide');
          this.code.sync();
        },
        loadEditableControls: function ($image) {
          var imageBox = $('<span id="redactor-image-box" data-redactor="verified">');
          imageBox.css('float', $image.css('float')).attr('contenteditable', false);
          if ($image[0].style.margin != 'auto') {
            imageBox.css({
              marginTop: $image[0].style.marginTop,
              marginBottom: $image[0].style.marginBottom,
              marginLeft: $image[0].style.marginLeft,
              marginRight: $image[0].style.marginRight
            });
            $image.css('margin', '');
          } else {
            imageBox.css({
              'display': 'block',
              'margin': 'auto'
            });
          }
          $image.css('opacity', '.5').after(imageBox);
          // editter
          this.image.editter = $('<span id="redactor-image-editter" data-redactor="verified">' + this.lang.get('edit') + '</span>');
          this.image.editter.attr('contenteditable', false);
          this.image.editter.on('click', $.proxy(function () {
            this.image.showEdit($image);
          }, this));
          imageBox.append(this.image.editter);
          // position correction
          var editerWidth = this.image.editter.innerWidth();
          this.image.editter.css('margin-left', '-' + editerWidth / 2 + 'px');
          // resizer
          if (this.opts.imageResizable && !this.utils.isMobile()) {
            var imageResizer = $('<span id="redactor-image-resizer" data-redactor="verified"></span>');
            if (!this.utils.isDesktop()) {
              imageResizer.css({
                width: '15px',
                height: '15px'
              });
            }
            imageResizer.attr('contenteditable', false);
            imageBox.append(imageResizer);
            imageBox.append($image);
            return imageResizer;
          } else {
            imageBox.append($image);
            return false;
          }
        },
        remove: function (image) {
          var $image = $(image);
          var $link = $image.closest('a');
          var $figure = $image.closest('figure');
          var $parent = $image.parent();
          if ($('#redactor-image-box').size() !== 0) {
            $parent = $('#redactor-image-box').parent();
          }
          var $next;
          if ($figure.size() !== 0) {
            $next = $figure.next();
            $figure.remove();
          } else if ($link.size() !== 0) {
            $parent = $link.parent();
            $link.remove();
          } else {
            $image.remove();
          }
          $('#redactor-image-box').remove();
          if ($figure.size() !== 0) {
            this.caret.setStart($next);
          } else {
            this.caret.setStart($parent);
          }
          // delete callback
          this.core.setCallback('imageDelete', $image[0].src, $image);
          this.modal.close();
          this.code.sync();
        },
        insert: function (json, direct, e) {
          // error callback
          if (typeof json.error != 'undefined') {
            this.modal.close();
            this.selection.restore();
            this.core.setCallback('imageUploadError', json);
            return;
          }
          var $img;
          if (typeof json == 'string') {
            $img = $(json).attr('data-redactor-inserted-image', 'true');
          } else {
            $img = $('<img>');
            $img.attr('src', json.filelink).attr('data-redactor-inserted-image', 'true');
          }
          var node = $img;
          var isP = this.utils.isCurrentOrParent('P');
          if (isP) {
            // will replace
            node = $('<blockquote />').append($img);
          }
          if (direct) {
            this.selection.removeMarkers();
            var marker = this.selection.getMarker();
            this.insert.nodeToCaretPositionFromPoint(e, marker);
          } else {
            this.modal.close();
          }
          this.selection.restore();
          this.buffer.set();
          this.insert.html(this.utils.getOuterHtml(node), false);
          var $image = this.$editor.find('img[data-redactor-inserted-image=true]').removeAttr('data-redactor-inserted-image');
          if (isP) {
            $image.parent().contents().unwrap().wrap('<p />');
          } else if (this.opts.linebreaks) {
            $image.before('<br>').after('<br>');
          }
          if (typeof json == 'string')
            return;
          this.core.setCallback('imageUpload', $image, json);
        }
      };
    },
    file: function () {
      return {
        show: function () {
          this.modal.load('file', this.lang.get('file'), 700);
          this.upload.init('#redactor-modal-file-upload', this.opts.fileUpload, this.file.insert);
          this.selection.save();
          this.selection.get();
          var text = this.sel.toString();
          $('#redactor-filename').val(text);
          this.modal.show();
        },
        insert: function (json, direct, e) {
          // error callback
          if (typeof json.error != 'undefined') {
            this.modal.close();
            this.selection.restore();
            this.core.setCallback('fileUploadError', json);
            return;
          }
          var link;
          if (typeof json == 'string') {
            link = json;
          } else {
            var text = $('#redactor-filename').val();
            if (typeof text == 'undefined' || text === '')
              text = json.filename;
            link = '<a href="' + json.filelink + '" id="filelink-marker">' + text + '</a>';
          }
          if (direct) {
            this.selection.removeMarkers();
            var marker = this.selection.getMarker();
            this.insert.nodeToCaretPositionFromPoint(e, marker);
          } else {
            this.modal.close();
          }
          this.selection.restore();
          this.buffer.set();
          this.insert.html(link);
          if (typeof json == 'string')
            return;
          var linkmarker = $(this.$editor.find('a#filelink-marker'));
          if (linkmarker.size() !== 0)
            linkmarker.removeAttr('id');
          else
            linkmarker = false;
          this.core.setCallback('fileUpload', linkmarker, json);
        }
      };
    },
    modal: function () {
      return {
        callbacks: {},
        loadTemplates: function () {
          this.opts.modal = {
            imageEdit: String() + '<section id="redactor-modal-image-edit">' + '<label>' + this.lang.get('title') + '</label>' + '<input type="text" id="redactor-image-title" />' + '<label class="redactor-image-link-option">' + this.lang.get('link') + '</label>' + '<input type="text" id="redactor-image-link" class="redactor-image-link-option" />' + '<label class="redactor-image-link-option"><input type="checkbox" id="redactor-image-link-blank"> ' + this.lang.get('link_new_tab') + '</label>' + '<label class="redactor-image-position-option">' + this.lang.get('image_position') + '</label>' + '<select class="redactor-image-position-option" id="redactor-image-align">' + '<option value="none">' + this.lang.get('none') + '</option>' + '<option value="left">' + this.lang.get('left') + '</option>' + '<option value="center">' + this.lang.get('center') + '</option>' + '<option value="right">' + this.lang.get('right') + '</option>' + '</select>' + '</section>',
            image: String() + '<section id="redactor-modal-image-insert">' + '<div id="redactor-modal-image-droparea"></div>' + '</section>',
            file: String() + '<section id="redactor-modal-file-insert">' + '<div id="redactor-modal-file-upload-box">' + '<label>' + this.lang.get('filename') + '</label>' + '<input type="text" id="redactor-filename" /><br><br>' + '<div id="redactor-modal-file-upload"></div>' + '</div>' + '</section>',
            link: String() + '<section id="redactor-modal-link-insert">' + '<label>URL</label>' + '<input type="url" id="redactor-link-url" />' + '<label>' + this.lang.get('text') + '</label>' + '<input type="text" id="redactor-link-url-text" />' + '<label><input type="checkbox" id="redactor-link-blank"> ' + this.lang.get('link_new_tab') + '</label>' + '</section>'
          };
          $.extend(this.opts, this.opts.modal);
        },
        addCallback: function (name, callback) {
          this.modal.callbacks[name] = callback;
        },
        createTabber: function ($modal) {
          this.modal.$tabber = $('<div>').attr('id', 'redactor-modal-tabber');
          $modal.prepend(this.modal.$tabber);
        },
        addTab: function (id, name, active) {
          var $tab = $('<a href="#" rel="tab' + id + '">').text(name);
          if (active) {
            $tab.addClass('active');
          }
          var self = this;
          $tab.on('click', function (e) {
            e.preventDefault();
            $('.redactor-tab').hide();
            $('.redactor-' + $(this).attr('rel')).show();
            self.modal.$tabber.find('a').removeClass('active');
            $(this).addClass('active');
          });
          this.modal.$tabber.append($tab);
        },
        addTemplate: function (name, template) {
          this.opts.modal[name] = template;
        },
        getTemplate: function (name) {
          return this.opts.modal[name];
        },
        getModal: function () {
          return this.$modalBody.find('section');
        },
        load: function (templateName, title, width) {
          this.modal.templateName = templateName;
          this.modal.width = width;
          this.modal.build();
          this.modal.enableEvents();
          this.modal.setTitle(title);
          this.modal.setDraggable();
          this.modal.setContent();
          // callbacks
          if (typeof this.modal.callbacks[templateName] != 'undefined') {
            this.modal.callbacks[templateName].call(this);
          }
        },
        show: function () {
          this.modal.bodyOveflow = $(document.body).css('overflow');
          $(document.body).css('overflow', 'hidden');
          if (this.utils.isMobile()) {
            this.modal.showOnMobile();
          } else {
            this.modal.showOnDesktop();
          }
          this.$modalOverlay.show();
          this.$modalBox.show();
          this.modal.setButtonsWidth();
          this.utils.saveScroll();
          // resize
          if (!this.utils.isMobile()) {
            setTimeout($.proxy(this.modal.showOnDesktop, this), 0);
            $(window).on('resize.redactor-modal', $.proxy(this.modal.resize, this));
          }
          // modal shown callback
          this.core.setCallback('modalOpened', this.modal.templateName, this.$modal);
          // fix bootstrap modal focus
          $(document).off('focusin.modal');
          // enter
          this.$modal.find('input[type=text]').on('keypress.redactor-modal', $.proxy(this.modal.setEnter, this));
        },
        showOnDesktop: function () {
          var height = this.$modal.outerHeight();
          var windowHeight = $(window).height();
          var windowWidth = $(window).width();
          if (this.modal.width > windowWidth) {
            this.$modal.css({
              width: '96%',
              marginTop: windowHeight / 2 - height / 2 + 'px'
            });
            return;
          }
          if (height > windowHeight) {
            this.$modal.css({
              width: this.modal.width + 'px',
              marginTop: '20px'
            });
          } else {
            this.$modal.css({
              width: this.modal.width + 'px',
              marginTop: windowHeight / 2 - height / 2 + 'px'
            });
          }
        },
        showOnMobile: function () {
          this.$modal.css({
            width: '96%',
            marginTop: '2%'
          });
        },
        resize: function () {
          if (this.utils.isMobile()) {
            this.modal.showOnMobile();
          } else {
            this.modal.showOnDesktop();
          }
        },
        setTitle: function (title) {
          this.$modalHeader.html(title);
        },
        setContent: function () {
          this.$modalBody.html(this.modal.getTemplate(this.modal.templateName));
        },
        setDraggable: function () {
          if (typeof $.fn.draggable === 'undefined')
            return;
          this.$modal.draggable({ handle: this.$modalHeader });
          this.$modalHeader.css('cursor', 'move');
        },
        setEnter: function (e) {
          if (e.which != 13)
            return;
          e.preventDefault();
          this.$modal.find('button.redactor-modal-action-btn').click();
        },
        createCancelButton: function () {
          var button = $('<button>').addClass('redactor-modal-btn redactor-modal-close-btn').html(this.lang.get('cancel'));
          button.on('click', $.proxy(this.modal.close, this));
          this.$modalFooter.append(button);
        },
        createDeleteButton: function (label) {
          return this.modal.createButton(label, 'delete');
        },
        createActionButton: function (label) {
          return this.modal.createButton(label, 'action');
        },
        createButton: function (label, className) {
          var button = $('<button>').addClass('redactor-modal-btn').addClass('redactor-modal-' + className + '-btn').html(label);
          this.$modalFooter.append(button);
          return button;
        },
        setButtonsWidth: function () {
          var buttons = this.$modalFooter.find('button');
          var buttonsSize = buttons.size();
          if (buttonsSize === 0)
            return;
          buttons.css('width', 100 / buttonsSize + '%');
        },
        build: function () {
          this.modal.buildOverlay();
          this.$modalBox = $('<div id="redactor-modal-box" />').hide();
          this.$modal = $('<div id="redactor-modal" />');
          this.$modalHeader = $('<header />');
          this.$modalClose = $('<span id="redactor-modal-close" />').html('&times;');
          this.$modalBody = $('<div id="redactor-modal-body" />');
          this.$modalFooter = $('<footer />');
          this.$modal.append(this.$modalHeader);
          this.$modal.append(this.$modalClose);
          this.$modal.append(this.$modalBody);
          this.$modal.append(this.$modalFooter);
          this.$modalBox.append(this.$modal);
          this.$modalBox.appendTo(document.body);
        },
        buildOverlay: function () {
          this.$modalOverlay = $('<div id="redactor-modal-overlay">').hide();
          $('body').prepend(this.$modalOverlay);
        },
        enableEvents: function () {
          this.$modalClose.on('click.redactor-modal', $.proxy(this.modal.close, this));
          $(document).on('keyup.redactor-modal', $.proxy(this.modal.closeHandler, this));
          this.$editor.on('keyup.redactor-modal', $.proxy(this.modal.closeHandler, this));
          this.$modalBox.on('click.redactor-modal', $.proxy(this.modal.close, this));
        },
        disableEvents: function () {
          this.$modalClose.off('click.redactor-modal');
          $(document).off('keyup.redactor-modal');
          this.$editor.off('keyup.redactor-modal');
          this.$modalBox.off('click.redactor-modal');
          $(window).off('resize.redactor-modal');
        },
        closeHandler: function (e) {
          if (e.which != this.keyCode.ESC)
            return;
          this.modal.close(false);
        },
        close: function (e) {
          if (e) {
            if (!$(e.target).hasClass('redactor-modal-close-btn') && e.target != this.$modalClose[0] && e.target != this.$modalBox[0]) {
              return;
            }
            e.preventDefault();
          }
          if (!this.$modalBox)
            return;
          this.modal.disableEvents();
          this.$modalOverlay.remove();
          this.$modalBox.fadeOut('fast', $.proxy(function () {
            this.$modalBox.remove();
            setTimeout($.proxy(this.utils.restoreScroll, this), 0);
            if (e !== undefined)
              this.selection.restore();
            $(document.body).css('overflow', this.modal.bodyOveflow);
            this.core.setCallback('modalClosed', this.modal.templateName);
          }, this));
        }
      };
    },
    progress: function () {
      return {
        show: function () {
          $(document.body).append($('<div id="redactor-progress"><span></span></div>'));
          $('#redactor-progress').fadeIn();
        },
        hide: function () {
          $('#redactor-progress').fadeOut(1500, function () {
            $(this).remove();
          });
        }
      };
    },
    upload: function () {
      return {
        init: function (id, url, callback) {
          this.upload.direct = false;
          this.upload.callback = callback;
          this.upload.url = url;
          this.upload.$el = $(id);
          this.upload.$droparea = $('<div id="redactor-droparea" />');
          this.upload.$placeholdler = $('<div id="redactor-droparea-placeholder" />').text('Drop file here or ');
          this.upload.$input = $('<input type="file" name="file" />');
          this.upload.$placeholdler.append(this.upload.$input);
          this.upload.$droparea.append(this.upload.$placeholdler);
          this.upload.$el.append(this.upload.$droparea);
          this.upload.$droparea.off('redactor.upload');
          this.upload.$input.off('redactor.upload');
          this.upload.$droparea.on('dragover.redactor.upload', $.proxy(this.upload.onDrag, this));
          this.upload.$droparea.on('dragleave.redactor.upload', $.proxy(this.upload.onDragLeave, this));
          // change
          this.upload.$input.on('change.redactor.upload', $.proxy(function (e) {
            e = e.originalEvent || e;
            this.upload.traverseFile(this.upload.$input[0].files[0], e);
          }, this));
          // drop
          this.upload.$droparea.on('drop.redactor.upload', $.proxy(function (e) {
            e.preventDefault();
            this.upload.$droparea.removeClass('drag-hover').addClass('drag-drop');
            this.upload.onDrop(e);
          }, this));
        },
        directUpload: function (file, e) {
          this.upload.direct = true;
          this.upload.traverseFile(file, e);
        },
        onDrop: function (e) {
          e = e.originalEvent || e;
          var files = e.dataTransfer.files;
          this.upload.traverseFile(files[0], e);
        },
        traverseFile: function (file, e) {
          if (this.opts.s3) {
            this.upload.setConfig(file);
            this.upload.s3uploadFile(file);
            return;
          }
          var formData = !!window.FormData ? new FormData() : null;
          if (window.FormData) {
            this.upload.setConfig(file);
            var name = this.upload.type == 'image' ? this.opts.imageUploadParam : this.opts.fileUploadParam;
            formData.append(name, file);
          }
          this.progress.show();
          this.upload.sendData(formData, e);
        },
        setConfig: function (file) {
          this.upload.getType(file);
          if (this.upload.direct) {
            this.upload.url = this.upload.type == 'image' ? this.opts.imageUpload : this.opts.fileUpload;
            this.upload.callback = this.upload.type == 'image' ? this.image.insert : this.file.insert;
          }
        },
        getType: function (file) {
          this.upload.type = 'image';
          if (this.opts.imageTypes.indexOf(file.type) == -1) {
            this.upload.type = 'file';
          }
        },
        getHiddenFields: function (obj, fd) {
          if (obj === false || typeof obj !== 'object')
            return fd;
          $.each(obj, $.proxy(function (k, v) {
            if (v !== null && v.toString().indexOf('#') === 0)
              v = $(v).val();
            fd.append(k, v);
          }, this));
          return fd;
        },
        sendData: function (formData, e) {
          // append hidden fields
          if (this.upload.type == 'image') {
            formData = this.upload.getHiddenFields(this.opts.uploadImageFields, formData);
            formData = this.upload.getHiddenFields(this.upload.imageFields, formData);
          } else {
            formData = this.upload.getHiddenFields(this.opts.uploadFileFields, formData);
            formData = this.upload.getHiddenFields(this.upload.fileFields, formData);
          }
          var xhr = new XMLHttpRequest();
          xhr.open('POST', this.upload.url);
          // complete
          xhr.onreadystatechange = $.proxy(function () {
            if (xhr.readyState == 4) {
              var data = xhr.responseText;
              data = data.replace(/^\[/, '');
              data = data.replace(/\]$/, '');
              var json;
              try {
                json = typeof data === 'string' ? $.parseJSON(data) : data;
              } catch (err) {
                json = { error: true };
              }
              this.progress.hide();
              if (!this.upload.direct) {
                this.upload.$droparea.removeClass('drag-drop');
              }
              this.upload.callback(json, this.upload.direct, e);
            }
          }, this);
          /*
					xhr.upload.onprogress = $.proxy(function(e)
					{
						if (e.lengthComputable)
						{
							var complete = (e.loaded / e.total * 100 | 0);
							//progress.value = progress.innerHTML = complete;
						}

					}, this);
					*/
          xhr.send(formData);
        },
        onDrag: function (e) {
          e.preventDefault();
          this.upload.$droparea.addClass('drag-hover');
        },
        onDragLeave: function (e) {
          e.preventDefault();
          this.upload.$droparea.removeClass('drag-hover');
        },
        clearImageFields: function () {
          this.upload.imageFields = {};
        },
        addImageFields: function (name, value) {
          this.upload.imageFields[name] = value;
        },
        removeImageFields: function (name) {
          delete this.upload.imageFields[name];
        },
        clearFileFields: function () {
          this.upload.fileFields = {};
        },
        addFileFields: function (name, value) {
          this.upload.fileFields[name] = value;
        },
        removeFileFields: function (name) {
          delete this.upload.fileFields[name];
        },
        s3uploadFile: function (file) {
          this.upload.s3executeOnSignedUrl(file, $.proxy(function (signedURL) {
            this.upload.s3uploadToS3(file, signedURL);
          }, this));
        },
        s3executeOnSignedUrl: function (file, callback) {
          var xhr = new XMLHttpRequest();
          var mark = '?';
          if (this.opts.s3.search(/\?/) != '-1')
            mark = '&';
          xhr.open('GET', this.opts.s3 + mark + 'name=' + file.name + '&type=' + file.type, true);
          // Hack to pass bytes through unprocessed.
          if (xhr.overrideMimeType)
            xhr.overrideMimeType('text/plain; charset=x-user-defined');
          var that = this;
          xhr.onreadystatechange = function (e) {
            if (this.readyState == 4 && this.status == 200) {
              that.progress.show();
              callback(decodeURIComponent(this.responseText));
            } else if (this.readyState == 4 && this.status != 200) {
            }
          };
          xhr.send();
        },
        s3createCORSRequest: function (method, url) {
          var xhr = new XMLHttpRequest();
          if ('withCredentials' in xhr) {
            xhr.open(method, url, true);
          } else if (typeof XDomainRequest != 'undefined') {
            xhr = new XDomainRequest();
            xhr.open(method, url);
          } else {
            xhr = null;
          }
          return xhr;
        },
        s3uploadToS3: function (file, url) {
          var xhr = this.upload.s3createCORSRequest('PUT', url);
          if (!xhr) {
          } else {
            xhr.onload = $.proxy(function () {
              if (xhr.status == 200) {
                //setProgress(100, 'Upload completed.');
                this.progress.hide();
                var s3file = url.split('?');
                if (!s3file[0]) {
                  // url parsing is fail
                  return false;
                }
                if (!this.upload.direct) {
                  this.upload.$droparea.removeClass('drag-drop');
                }
                var json = { filelink: s3file[0] };
                if (this.upload.type == 'file') {
                  var arr = s3file[0].split('/');
                  json.filename = arr[arr.length - 1];
                }
                this.upload.callback(json, this.upload.direct, false);
              } else {
              }
            }, this);
            xhr.onerror = function () {
            };
            xhr.upload.onprogress = function (e) {
            };
            xhr.setRequestHeader('Content-Type', file.type);
            xhr.setRequestHeader('x-amz-acl', 'public-read');
            xhr.send(file);
          }
        }
      };
    },
    utils: function () {
      return {
        isMobile: function () {
          return /(iPhone|iPod|BlackBerry|Android)/.test(navigator.userAgent);
        },
        isDesktop: function () {
          return !/(iPhone|iPod|iPad|BlackBerry|Android)/.test(navigator.userAgent);
        },
        isString: function (obj) {
          return Object.prototype.toString.call(obj) == '[object String]';
        },
        isEmpty: function (html, removeEmptyTags) {
          html = html.replace(/[\u200B-\u200D\uFEFF]/g, '');
          html = html.replace(/&nbsp;/gi, '');
          html = html.replace(/<\/?br\s?\/?>/g, '');
          html = html.replace(/\s/g, '');
          html = html.replace(/^<p>[^\W\w\D\d]*?<\/p>$/i, '');
          // remove empty tags
          if (removeEmptyTags !== false) {
            html = html.replace(/<[^\/>][^>]*><\/[^>]+>/gi, '');
            html = html.replace(/<[^\/>][^>]*><\/[^>]+>/gi, '');
          }
          html = $.trim(html);
          return html === '';
        },
        normalize: function (str) {
          if (typeof str === 'undefined')
            return 0;
          return parseInt(str.replace('px', ''), 10);
        },
        hexToRgb: function (hex) {
          if (typeof hex == 'undefined')
            return;
          if (hex.search(/^#/) == -1)
            return hex;
          var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
          hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
          });
          var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return 'rgb(' + parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) + ')';
        },
        getOuterHtml: function (el) {
          return $('<div>').append($(el).eq(0).clone()).html();
        },
        getAlignmentElement: function (el) {
          if ($.inArray(el.tagName, this.opts.alignmentTags) !== -1) {
            return $(el);
          } else {
            return $(el).closest(this.opts.alignmentTags.toString().toLowerCase(), this.$editor[0]);
          }
        },
        removeEmptyAttr: function (el, attr) {
          var $el = $(el);
          if (typeof $el.attr(attr) == 'undefined') {
            return true;
          }
          if ($el.attr(attr) === '') {
            $el.removeAttr(attr);
            return true;
          }
          return false;
        },
        removeEmpty: function (i, s) {
          var $s = $(s);
          $s.find('.redactor-invisible-space').replaceWith(function () {
            return $(this).contents();
          });
          if ($s.find('hr, br, img').length !== 0)
            return;
          var text = $.trim($s.text());
          if (this.utils.isEmpty(text, false)) {
            $s.remove();
          }
        },
        saveScroll: function () {
          if (this.utils.isSelectAll())
            return;
          this.saveEditorScroll = this.$editor.scrollTop();
          this.saveBodyScroll = $(window).scrollTop();
          if (this.opts.scrollTarget)
            this.saveTargetScroll = $(this.opts.scrollTarget).scrollTop();
        },
        restoreScroll: function () {
          if (typeof this.saveScroll === 'undefined' && typeof this.saveBodyScroll === 'undefined')
            return;
          $(window).scrollTop(this.saveBodyScroll);
          this.$editor.scrollTop(this.saveEditorScroll);
          if (this.opts.scrollTarget)
            $(this.opts.scrollTarget).scrollTop(this.saveTargetScroll);
        },
        createSpaceElement: function () {
          var space = document.createElement('span');
          space.className = 'redactor-invisible-space';
          space.innerHTML = this.opts.invisibleSpace;
          return space;
        },
        removeInlineTags: function (node) {
          var tags = this.opts.inlineTags;
          tags.push('span');
          if (node.tagName == 'PRE')
            tags.push('a');
          $(node).find(tags.join(',')).not('span.redactor-selection-marker').contents().unwrap();
        },
        replaceWithContents: function (node, removeInlineTags) {
          var self = this;
          $(node).replaceWith(function () {
            if (removeInlineTags === true)
              self.utils.removeInlineTags(this);
            return $(this).contents();
          });
        },
        replaceToTag: function (node, tag, removeInlineTags) {
          var replacement;
          var self = this;
          $(node).replaceWith(function () {
            replacement = $('<' + tag + ' />').append($(this).contents());
            for (var i = 0; i < this.attributes.length; i++) {
              replacement.attr(this.attributes[i].name, this.attributes[i].value);
            }
            if (removeInlineTags === true)
              self.utils.removeInlineTags(replacement);
            return replacement;
          });
          return replacement;
        },
        isStartOfElement: function () {
          var block = this.selection.getBlock();
          if (!block)
            return false;
          var offset = this.caret.getOffsetOfElement(block);
          return offset === 0 ? true : false;
        },
        isEndOfElement: function () {
          var block = this.selection.getBlock();
          if (!block)
            return false;
          var offset = this.caret.getOffsetOfElement(block);
          var text = $.trim($(block).text()).replace(/\n\r\n/g, '');
          return offset == text.length ? true : false;
        },
        isBlock: function (block) {
          block = block[0] || block;
          return block && this.utils.isBlockTag(block.tagName);
        },
        isBlockTag: function (tag) {
          if (typeof tag == 'undefined')
            return false;
          return this.reIsBlock.test(tag);
        },
        isTag: function (current, tag) {
          var element = $(current).closest(tag);
          if (element.size() == 1) {
            return element[0];
          }
          return false;
        },
        isSelectAll: function () {
          return this.selectAll;
        },
        enableSelectAll: function () {
          this.selectAll = true;
        },
        disableSelectAll: function () {
          this.selectAll = false;
        },
        isRedactorParent: function (el) {
          if (!el) {
            return false;
          }
          if ($(el).parents('.redactor-editor').length === 0 || $(el).hasClass('redactor-editor')) {
            return false;
          }
          return el;
        },
        isCurrentOrParent: function (tagName) {
          var parent = this.selection.getParent();
          var current = this.selection.getCurrent();
          if ($.isArray(tagName)) {
            var matched = 0;
            $.each(tagName, $.proxy(function (i, s) {
              if (this.utils.isCurrentOrParentOne(current, parent, s)) {
                matched++;
              }
            }, this));
            return matched === 0 ? false : true;
          } else {
            return this.utils.isCurrentOrParentOne(current, parent, tagName);
          }
        },
        isCurrentOrParentOne: function (current, parent, tagName) {
          return parent && parent.tagName === tagName ? parent : current && current.tagName === tagName ? current : false;
        },
        isOldIe: function () {
          return this.utils.browser('msie') && parseInt(this.utils.browser('version'), 10) < 9 ? true : false;
        },
        isLessIe10: function () {
          return this.utils.browser('msie') && parseInt(this.utils.browser('version'), 10) < 10 ? true : false;
        },
        isIe11: function () {
          return !!navigator.userAgent.match(/Trident\/7\./);
        },
        browser: function (browser) {
          var ua = navigator.userAgent.toLowerCase();
          var match = /(opr)[\/]([\w.]+)/.exec(ua) || /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf('trident') >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua) || ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
          if (browser == 'version')
            return match[2];
          if (browser == 'webkit')
            return match[1] == 'chrome' || match[1] == 'webkit';
          if (match[1] == 'rv')
            return browser == 'msie';
          if (match[1] == 'opr')
            return browser == 'webkit';
          return browser == match[1];
        }
      };
    }
  };
  // constructor
  Redactor.prototype.init.prototype = Redactor.prototype;
  // LINKIFY
  $.Redactor.fn.formatLinkify = function (protocol, convertLinks, convertUrlLinks, convertImageLinks, convertVideoLinks, linkSize) {
    var urlCheck = '((?:http[s]?:\\/\\/(?:www\\.)?|www\\.){1}(?:[0-9A-Za-z\\-%_]+\\.)+[a-zA-Z]{2,}(?::[0-9]+)?(?:(?:/[0-9A-Za-z\\-\\.%_]*)+)?(?:\\?(?:[0-9A-Za-z\\-\\.%_]+(?:=[0-9A-Za-z\\-\\.%_\\+]*)?)?(?:&(?:[0-9A-Za-z\\-\\.%_]+(?:=[0-9A-Za-z\\-\\.%_\\+]*)?)?)*)?(?:#[0-9A-Za-z\\-\\.%_\\+=\\?&;]*)?)';
    var regex = new RegExp(urlCheck, 'gi');
    var rProtocol = /(https?|ftp):\/\//i;
    var urlImage = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/gi;
    var childNodes = (this.$editor ? this.$editor[0] : this).childNodes, i = childNodes.length;
    while (i--) {
      var n = childNodes[i];
      if (n.nodeType === 3) {
        var html = n.nodeValue;
        // youtube & vimeo
        if (convertVideoLinks && html) {
          var iframeStart = '<iframe width="500" height="281" src="', iframeEnd = '" frameborder="0" allowfullscreen></iframe>';
          if (html.match(reUrlYoutube)) {
            html = html.replace(reUrlYoutube, iframeStart + '//www.youtube.com/embed/$1' + iframeEnd);
            $(n).after(html).remove();
          } else if (html.match(reUrlVimeo)) {
            html = html.replace(reUrlVimeo, iframeStart + '//player.vimeo.com/video/$2' + iframeEnd);
            $(n).after(html).remove();
          }
        }
        // image
        if (convertImageLinks && html && html.match(urlImage)) {
          html = html.replace(urlImage, '<img src="$1" />');
          $(n).after(html).remove();
          return;
        }
        // link
        if (html.search(/\$/g) != -1)
          html = html.replace(/\$/g, '&#36;');
        var matches = html.match(regex);
        if (convertUrlLinks && html && matches) {
          var len = matches.length;
          for (var z = 0; z < len; z++) {
            // remove dot in the end
            if (matches[z].match(/\.$/) !== null)
              matches[z] = matches[z].replace(/\.$/, '');
            var href = matches[z];
            var text = href;
            var space = '';
            if (href.match(/\s$/) !== null)
              space = ' ';
            var addProtocol = protocol + '://';
            if (href.match(rProtocol) !== null)
              addProtocol = '';
            if (text.length > linkSize)
              text = text.substring(0, linkSize) + '...';
            text = text.replace(/&#36;/g, '$').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            html = html.replace(href, '<a href="' + addProtocol + $.trim(href) + '">' + $.trim(text) + '</a>' + space);
          }
          $(n).after(html).remove();
        }
      } else if (n.nodeType === 1 && !/^(a|button|textarea)$/i.test(n.tagName)) {
        $.Redactor.fn.formatLinkify.call(n, protocol, convertLinks, convertUrlLinks, convertImageLinks, convertVideoLinks, linkSize);
      }
    }
  };
}(jQuery));
if (!RedactorPlugins)
  var RedactorPlugins = {};
RedactorPlugins.table = function () {
  return {
    getTemplate: function () {
      return String() + '<section id="redactor-modal-table-insert">' + '<label>' + this.lang.get('rows') + '</label>' + '<input type="text" size="5" value="2" id="redactor-table-rows" />' + '<label>' + this.lang.get('columns') + '</label>' + '<input type="text" size="5" value="3" id="redactor-table-columns" />' + '</section>';
    },
    init: function () {
      var dropdown = {};
      dropdown.insert_table = {
        title: this.lang.get('insert_table'),
        func: this.table.show
      };
      dropdown.insert_row_above = {
        title: this.lang.get('insert_row_above'),
        func: this.table.addRowAbove
      };
      dropdown.insert_row_below = {
        title: this.lang.get('insert_row_below'),
        func: this.table.addRowBelow
      };
      dropdown.insert_column_left = {
        title: this.lang.get('insert_column_left'),
        func: this.table.addColumnLeft
      };
      dropdown.insert_column_right = {
        title: this.lang.get('insert_column_right'),
        func: this.table.addColumnRight
      };
      dropdown.add_head = {
        title: this.lang.get('add_head'),
        func: this.table.addHead
      };
      dropdown.delete_head = {
        title: this.lang.get('delete_head'),
        func: this.table.deleteHead
      };
      dropdown.delete_column = {
        title: this.lang.get('delete_column'),
        func: this.table.deleteColumn
      };
      dropdown.delete_row = {
        title: this.lang.get('delete_row'),
        func: this.table.deleteRow
      };
      dropdown.delete_table = {
        title: this.lang.get('delete_table'),
        func: this.table.deleteTable
      };
      this.observe.addButton('td', 'table');
      this.observe.addButton('th', 'table');
      var button = this.button.addBefore('link', 'table', this.lang.get('table'));
      this.button.addDropdown(button, dropdown);
    },
    show: function () {
      this.modal.addTemplate('table', this.table.getTemplate());
      this.modal.load('table', this.lang.get('insert_table'), 300);
      this.modal.createCancelButton();
      var button = this.modal.createActionButton(this.lang.get('insert'));
      button.on('click', this.table.insert);
      this.selection.save();
      this.modal.show();
      $('#redactor-table-rows').focus();
    },
    insert: function () {
      var rows = $('#redactor-table-rows').val(), columns = $('#redactor-table-columns').val(), $tableBox = $('<div>'), tableId = Math.floor(Math.random() * 99999), $table = $('<table id="table' + tableId + '"><tbody></tbody></table>'), i, $row, z, $column;
      for (i = 0; i < rows; i++) {
        $row = $('<tr>');
        for (z = 0; z < columns; z++) {
          $column = $('<td>' + this.opts.invisibleSpace + '</td>');
          // set the focus to the first td
          if (i === 0 && z === 0) {
            $column.append(this.selection.getMarker());
          }
          $($row).append($column);
        }
        $table.append($row);
      }
      $tableBox.append($table);
      var html = $tableBox.html();
      this.modal.close();
      this.selection.restore();
      if (this.table.getTable())
        return;
      this.buffer.set();
      var current = this.selection.getBlock() || this.selection.getCurrent();
      if (current && current.tagName != 'BODY') {
        if (current.tagName == 'LI')
          current = $(current).closest('ul, ol');
        $(current).after(html);
      } else {
        this.insert.html(html);
      }
      this.selection.restore();
      var table = this.$editor.find('#table' + tableId);
      if (!this.opts.linebreaks && (this.utils.browser('mozilla') || this.utils.browser('msie'))) {
        var $next = table.next();
        if ($next.length === 0) {
          table.after(this.opts.emptyHtml);
        }
      }
      this.observe.buttons();
      table.find('span.redactor-selection-marker').remove();
      table.removeAttr('id');
      this.code.sync();
      this.core.setCallback('insertedTable', table);
    },
    getTable: function () {
      var $table = $(this.selection.getParent()).closest('table');
      if (!this.utils.isRedactorParent($table))
        return false;
      if ($table.size() === 0)
        return false;
      return $table;
    },
    restoreAfterDelete: function ($table) {
      this.selection.restore();
      $table.find('span.redactor-selection-marker').remove();
      this.code.sync();
    },
    deleteTable: function () {
      var $table = this.table.getTable();
      if (!$table)
        return;
      this.buffer.set();
      var $next = $table.next();
      if (!this.opts.linebreaks && $next.length !== 0) {
        this.caret.setStart($next);
      } else {
        this.caret.setAfter($table);
      }
      $table.remove();
      this.code.sync();
    },
    deleteRow: function () {
      var $table = this.table.getTable();
      if (!$table)
        return;
      var $current = $(this.selection.getCurrent());
      this.buffer.set();
      var $current_tr = $current.closest('tr');
      var $focus_tr = $current_tr.prev().length ? $current_tr.prev() : $current_tr.next();
      if ($focus_tr.length) {
        var $focus_td = $focus_tr.children('td, th').first();
        if ($focus_td.length)
          $focus_td.prepend(this.selection.getMarker());
      }
      $current_tr.remove();
      this.table.restoreAfterDelete($table);
    },
    deleteColumn: function () {
      var $table = this.table.getTable();
      if (!$table)
        return;
      this.buffer.set();
      var $current = $(this.selection.getCurrent());
      var $current_td = $current.closest('td, th');
      var index = $current_td[0].cellIndex;
      $table.find('tr').each($.proxy(function (i, elem) {
        var $elem = $(elem);
        var focusIndex = index - 1 < 0 ? index + 1 : index - 1;
        if (i === 0)
          $elem.find('td, th').eq(focusIndex).prepend(this.selection.getMarker());
        $elem.find('td, th').eq(index).remove();
      }, this));
      this.table.restoreAfterDelete($table);
    },
    addHead: function () {
      var $table = this.table.getTable();
      if (!$table)
        return;
      this.buffer.set();
      if ($table.find('thead').size() !== 0) {
        this.table.deleteHead();
        return;
      }
      var tr = $table.find('tr').first().clone();
      tr.find('td').html(this.opts.invisibleSpace);
      $thead = $('<thead></thead>').append(tr);
      $table.prepend($thead);
      this.code.sync();
    },
    deleteHead: function () {
      var $table = this.table.getTable();
      if (!$table)
        return;
      var $thead = $table.find('thead');
      if ($thead.size() === 0)
        return;
      this.buffer.set();
      $thead.remove();
      this.code.sync();
    },
    addRowAbove: function () {
      this.table.addRow('before');
    },
    addRowBelow: function () {
      this.table.addRow('after');
    },
    addColumnLeft: function () {
      this.table.addColumn('before');
    },
    addColumnRight: function () {
      this.table.addColumn('after');
    },
    addRow: function (type) {
      var $table = this.table.getTable();
      if (!$table)
        return;
      this.buffer.set();
      var $current = $(this.selection.getCurrent());
      var $current_tr = $current.closest('tr');
      var new_tr = $current_tr.clone();
      new_tr.find('th').replaceWith(function () {
        var $td = $('<td>');
        $td[0].attributes = this.attributes;
        return $td.append($(this).contents());
      });
      new_tr.find('td').html(this.opts.invisibleSpace);
      if (type == 'after') {
        $current_tr.after(new_tr);
      } else {
        $current_tr.before(new_tr);
      }
      this.code.sync();
    },
    addColumn: function (type) {
      var $table = this.table.getTable();
      if (!$table)
        return;
      var index = 0;
      var current = $(this.selection.getCurrent());
      this.buffer.set();
      var $current_tr = current.closest('tr');
      var $current_td = current.closest('td, th');
      $current_tr.find('td, th').each($.proxy(function (i, elem) {
        if ($(elem)[0] === $current_td[0])
          index = i;
      }, this));
      $table.find('tr').each($.proxy(function (i, elem) {
        var $current = $(elem).find('td, th').eq(index);
        var td = $current.clone();
        td.html(this.opts.invisibleSpace);
        if (type == 'after') {
          $current.after(td);
        } else {
          $current.before(td);
        }
      }, this));
      this.code.sync();
    }
  };
};
'use strict';
/**
 * @ngdoc overview
 * @name webUiApp
 * @description
 * # webUiApp
 *
 * Main module of the application.
 */
angular.module('webUiApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngTouch',
  'ui.sortable',
  'LocalStorageModule',
  'toastr',
  'ui.router.state',
  'ncy-angular-breadcrumb',
  'angularModalService',
  'ui.bootstrap',
  'angular-redactor'
]).config([
  'redactorOptions',
  function (redactorOptions) {
    redactorOptions.buttonSource = true;
    redactorOptions.minHeight = 200;
    redactorOptions.buttons = [
      'html',
      'formatting',
      'bold',
      'italic',
      'underline',
      'unorderedlist',
      'orderedlist',
      'link'
    ];
    redactorOptions.formatting = [
      'p',
      'h1',
      'h2',
      'h3',
      'h4'
    ];
    redactorOptions.plugins = [
      'table',
      'classHack'
    ];
    redactorOptions.cleanOnPaste = true;
    redactorOptions.toolbarFixed = true;
  }
]).config([
  '$httpProvider',
  function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
  }
]).config([
  'localStorageServiceProvider',
  function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('ls');
  }
]).config([
  '$breadcrumbProvider',
  function ($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
      prefixStateName: 'home',
      template: '<ol class="breadcrumb">' + '<li ng-repeat="step in steps | limitTo:(steps.length-1)"><a href="{{step.ncyBreadcrumbLink}}{{$scope.parentId}}">{{step.ncyBreadcrumbLabel}}</a></li>' + '<li ng-repeat="step in steps | limitTo:-1" class="active"><span>{{step.ncyBreadcrumbLabel}}</span></li>' + '</ol>'
    });
  }
]).config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'components/guidelines/guidelines.html',
      controller: 'GuidelinesCtrl',
      data: { ncyBreadcrumbLabel: 'Retningslinjer' }
    }).state({
      name: 'guideline',
      url: '/guideline/{guidelineId}',
      templateUrl: 'components/guidelines/guideline/guideline.html',
      controller: 'GuidelineCtrl',
      data: { ncyBreadcrumbLabel: 'Retningslinje {{guidelineLabel}}' }
    }).state('section', {
      url: '/guideline/{guidelineId}/section/{sectionId}',
      views: {
        '@': {
          templateUrl: 'components/guidelines/guideline/section/section.html',
          controller: 'SectionCtrl'
        }
      },
      data: {
        ncyBreadcrumbParent: 'guideline',
        ncyBreadcrumbLabel: 'Seksjon {{sectionLabel}}'
      }
    }).state('recommendation', {
      url: '/guideline/{guidelineId}/section/{sectionId}/recommendation/{recommendationId}',
      views: {
        '@': {
          templateUrl: 'components/guidelines/guideline/section/recommendation/recommendation.html',
          controller: 'RecommendationCtrl'
        }
      },
      data: {
        ncyBreadcrumbParent: 'section',
        ncyBreadcrumbLabel: 'Anbefaling {{recommendationLabel}}'
      }
    }).state('author', {
      url: '/author',
      views: {
        '@': {
          templateUrl: 'components/author/author.html',
          controller: 'AuthorCtrl'
        }
      },
      data: { ncyBreadcrumbLabel: 'Forfatter' }
    }).state('pico', {
      url: '/guideline/{guidelineId}/section/{sectionId}/recommendation/{recommendationId}/pico/{picoId}',
      views: {
        '@': {
          templateUrl: 'components/guidelines/guideline/section/recommendation/pico/pico.html',
          controller: 'PicoCtrl'
        }
      },
      data: {
        ncyBreadcrumbParent: 'recommendation',
        ncyBreadcrumbLabel: 'Pico'
      }
    }).state('picooutcome', {
      url: '/guideline/{guidelineId}/section/{sectionId}/recommendation/{recommendationId}/pico/{picoId}/picooutcome/{picoOutcomeId}',
      views: {
        '@': {
          templateUrl: 'components/guidelines/guideline/section/recommendation/pico/picooutcome/picoOutcome.html',
          controller: 'PicoOutcomeCtrl'
        }
      },
      data: {
        ncyBreadcrumbParent: 'pico',
        ncyBreadcrumbLabel: 'Pico outcome'
      }
    }).state('picoCode', {
      url: '/guideline/{guidelineId}/section/{sectionId}/recommendation/{recommendationId}/pico/{picoId}/picoCode/{picoCodeId}',
      views: {
        '@': {
          templateUrl: 'components/guidelines/guideline/section/recommendation/pico/picocode/picocode.html',
          controller: 'PicocodeCtrl'
        }
      },
      data: {
        ncyBreadcrumbParent: 'pico',
        ncyBreadcrumbLabel: 'Pico kode'
      }
    }).state('taxonomyCode', {
      url: '/guideline/{guidelineId}/section/{sectionId}/recommendation/{recommendationId}/pico/{picoId}/picoCode/{picoCodeId}/taxonomyCode/{taxonomyCodeId}',
      views: {
        '@': {
          templateUrl: 'components/guidelines/guideline/section/recommendation/pico/picocode/taxonomycode/taxonomycode.html',
          controller: 'TaxonomycodeCtrl'
        }
      },
      data: {
        ncyBreadcrumbParent: 'picoCode',
        ncyBreadcrumbLabel: 'Taxonomy kode'
      }
    }).state('login', {
      url: '/login',
      views: {
        '@': {
          templateUrl: 'common/login.html',
          controller: 'LoginCtrl'
        }
      },
      data: { ncyBreadcrumbLabel: 'Login' }
    }).state('register', {
      url: '/register',
      views: {
        '@': {
          templateUrl: 'common/register.html',
          controller: 'RegisterCtrl'
        }
      },
      data: { ncyBreadcrumbLabel: 'Register' }
    }).state('emrinfo', {
      url: '/guideline/{guidelineId}/section/{sectionId}/recommendation/{recommendationId}/emrinfo/{emrInfoId}',
      views: {
        '@': {
          templateUrl: 'components/guidelines/guideline/section/recommendation/emrinfo/emrInfo.html',
          controller: 'EmrInfoCtrl'
        }
      },
      data: {
        ncyBreadcrumbParent: 'recommendation',
        ncyBreadcrumbLabel: 'Emr Info'
      }
    }).state('keyinfo', {
      url: '/guideline/{guidelineId}/section/{sectionId}/recommendation/{recommendationId}/keyinfo/{keyInfoId}',
      views: {
        '@': {
          templateUrl: 'components/guidelines/guideline/section/recommendation/keyinfo/keyInfo.html',
          controller: 'KeyInfoCtrl'
        }
      },
      data: {
        ncyBreadcrumbParent: 'recommendation',
        ncyBreadcrumbLabel: 'Key Info'
      }
    }).state('reference', {
      url: '/reference',
      views: {
        '@': {
          templateUrl: 'components/reference/reference.html',
          controller: 'ReferenceCtrl'
        }
      },
      data: { ncyBreadcrumbLabel: 'Referanse' }
    });
    $urlRouterProvider.otherwise('/');
  }
]).value('apiUrl', 'http://localhost:50500/api/v1/');
'use strict';
angular.module('webUiApp').directive('btnHref', [
  '$location',
  function ($location) {
    return function (scope, element, attrs) {
      var path;
      attrs.$observe('btnHref', function (val) {
        path = val;
      });
      element.bind('click', function () {
        scope.$apply(function () {
          $location.path(path);
        });
      });
    };
  }
]);
'use strict';
angular.module('webUiApp').directive('ngConfirmClick', [function () {
    return {
      priority: -1,
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.bind('click', function (e) {
          var message = attrs.ngConfirmClick;
          if (message && !confirm(message)) {
            e.stopImmediatePropagation();
            e.preventDefault();
          }
        });
      }
    };
  }]);
'use strict';
/**
 * @ngdoc directive
 * @name webUiApp.directive:logIn
 * @description 
 * # logIn
 */
angular.module('webUiApp').directive('logIn', [
  'localStorageService',
  'authService',
  function (localStorageService, authService) {
    return {
      templateUrl: 'common/_login.html',
      restrict: 'E',
      replace: 'true',
      link: function (scope, element, attrs) {
        scope.$on('$stateChangeSuccess', function () {
          scope.authData = localStorageService.get('authorizationData');
          if (scope.authData) {
            var dateNow = new Date();
            var expiresDate = new Date(scope.authData.expires);
            if (dateNow > expiresDate) {
              console.log('authorizationData has expired');
              localStorageService.remove('authorizationData');
            }
          }
          scope.logOutBtnClick = function () {
            authService.logOut();
            scope.authData = null;
          };
        });
      }
    };
  }
]);
'use strict';
/**
 * @ngdoc directive
 * @name webUiApp.directive:metadata
 * @description
 * # metadata
 */
angular.module('webUiApp').directive('metadata', function () {
  return {
    template: '<small><p><b>Opprettet av:</b> {{createdBy}},' + '<i>{{createdDate | date}}</i>  <b>Oppdatert av:</b> {{updatedBy}}, <i>{{updatedDate | date}}</i></p></small>',
    restrict: 'E',
    scope: {
      'createdBy': '@',
      'createdDate': '@',
      'updatedBy': '@',
      'updatedDate': '@'
    }
  };
});
'use strict';
/**
 * @ngdoc directive
 * @name webUiApp.directive:previewButton
 * @description
 * # previewButton
 */
angular.module('webUiApp').directive('previewButton', [
  '$state',
  '$stateParams',
  function ($state, $stateParams) {
    return {
      template: '<a class="pull-right" href="{{url}}" target="_new">Forh\xe5ndsvis {{text}}  <span class="glyphicon glyphicon-new-window"></span></btn>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var baseUrl = 'http://localhost:8000/#/';
        switch ($state.current.name) {
        case 'guideline':
          scope.text = 'retningslinje';
          scope.url = baseUrl + $stateParams.guidelineId;
          break;
        case 'section':
          scope.text = 'seksjon';
          scope.url = baseUrl + $stateParams.guidelineId + '/section/' + $stateParams.sectionId;
          break;
        case 'recommendation':
          scope.text = 'anbefaling';
          scope.url = baseUrl + $stateParams.guidelineId + '/section/' + $stateParams.sectionId + '/recommendation/' + $stateParams.recommendationId;
          break;
        default:
          scope.text = 'retningslinjer';
          scope.url = baseUrl;
          break;
        }
      }
    };
  }
]);
'use strict';
/**
 * @ngdoc directive
 * @name webUiApp.directive:publishedStatus
 * @description
 * # publishedStatus
 */
angular.module('webUiApp').directive('publishedStatus', function () {
  return {
    templateUrl: 'common/_publishedstage.html',
    restrict: 'E'
  };
});
'use strict';
/**
 * @ngdoc directive
 * @name webUiApp.directive:sortOrder
 * @description
 * # sortOrder
 */
angular.module('webUiApp').directive('sortOrder', function () {
  return {
    template: '<button type="button" class="btn btn-default" ng-click="editOrderBtnClick()">Rediger rekkef\xf8lgen</button>',
    restrict: 'A',
    replace: true
  };
});
'use strict';
/**
 * @ngdoc service
 * @name webUiApp.authInterceptorService
 * @description
 * # authInterceptorService  
 * Factory in the webUiApp.
 */
angular.module('webUiApp').factory('authInterceptorService', [
  '$q',
  '$location',
  'localStorageService',
  function ($q, $location, localStorageService) {
    var authInterceptorServiceFactory = {};
    var _request = function (config) {
      config.headers = config.headers || {};
      var authData = localStorageService.get('authorizationData');
      if (authData) {
        config.headers.Authorization = 'Bearer ' + authData.token;
      } else if ($location.path() == '/register') {
      } else {
        $location.path('/login');
      }
      return config;
    };
    var _responseError = function (rejection) {
      if (rejection.status === 401) {
        $location.path('/login');
      }
      return $q.reject(rejection);
    };
    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;
    return authInterceptorServiceFactory;
  }
]);
'use strict';
/**
 * @ngdoc service
 * @name webUiApp.authService
 * @description
 * # authService
 * Factory in the webUiApp.
 */
angular.module('webUiApp').factory('authService', [
  '$http',
  '$q',
  'localStorageService',
  function ($http, $q, localStorageService) {
    var serviceBase = 'http://localhost:50500/';
    var authServiceFactory = {};
    var _authentication = {
        isAuth: false,
        userName: ''
      };
    var _saveRegistration = function (registration) {
      _logOut();
      return $http.post(serviceBase + 'api/v1/account/register', registration).then(function (response) {
        return response;
      });
    };
    var _login = function (loginData) {
      var data = 'grant_type=password&username=' + loginData.userName + '&password=' + loginData.password;
      var deferred = $q.defer();
      $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
        localStorageService.set('authorizationData', {
          token: response.access_token,
          userName: loginData.userName,
          expires: response['.expires']
        });
        _authentication.isAuth = true;
        _authentication.userName = loginData.userName;
        deferred.resolve(response);
      }).error(function (err, status) {
        _logOut();
        deferred.reject(err);
      });
      return deferred.promise;
    };
    var _logOut = function () {
      localStorageService.remove('authorizationData');
      _authentication.isAuth = false;
      _authentication.userName = '';
    };
    var _fillAuthData = function () {
      var authData = localStorageService.get('authorizationData');
      if (authData) {
        _authentication.isAuth = true;
        _authentication.userName = authData.userName;
      }
    };
    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    return authServiceFactory;
  }
]);
'use strict';
/**
 * @ngdoc service
 * @name webUiApp.crud
 * @description
 * # crud
 * Service in the webUiApp.
 */
angular.module('webUiApp').service('Crud', [
  'toastr',
  function crud(toastr) {
    this.handlePostError = function (error) {
      handlePostError(error);
    };
    var handlePostError = function (error) {
      if (error.status == 401) {
        toastr.warning('Logg inn for \xe5 lagre');
      } else {
        toastr.error('Status code: ' + error.status + ' ' + error.statusText + ' Error data: ' + error.data.message, 'Error!');
      }
    };
  }
]);
'use strict';
/**
 * @ngdoc service
 * @name webUiApp.crud
 * @description
 * # Notificationfactory
 * Service in the webUiApp.
 */
angular.module('webUiApp').service('NotificationFactory', [
  'toastr',
  function (toastr) {
    this.handlePostError = function (error) {
      handlePostError(error);
    };
    this.displaySuccess = function (message, resource) {
      if (typeof resource != 'undefined') {
        toastr.success(resource, message);
      } else {
        toastr.success(message);
      }
    };
    var handlePostError = function (error) {
      if (error.status == 401) {
        toastr.warning('Logg inn for \xe5 lagre');
      } else if (error.status == 0) {
        toastr.error('Kan ikke opprette forbindelse til API');
      } else if (error.status == 404) {
        toastr.error('Status code: ' + error.status + ' Kunne ikke finne ressurs.');
      } else {
        toastr.error('Status code: ' + error.status + ' ' + error.statusText + ' Error data: ' + error.data.message, 'Error!');
      }
    };
  }
]);
'use strict';
angular.module('webUiApp').controller('headerCtrl', [
  '$scope',
  '$location',
  function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
      return viewLocation == $location.path();
    };
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name webUiApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp').controller('LoginCtrl', [
  '$scope',
  '$location',
  'authService',
  function ($scope, $location, authService) {
    $scope.loginData = {
      userName: '',
      password: ''
    };
    $scope.message = '';
    $scope.login = function () {
      authService.login($scope.loginData).then(function () {
        $location.path('/');
      }, function (err) {
        $scope.message = err.error_description;
      });
    };
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name webUiApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp').controller('RegisterCtrl', [
  '$scope',
  '$location',
  '$timeout',
  'authService',
  function ($scope, $location, $timeout, authService) {
    $scope.savedSuccessfully = false;
    $scope.message = '';
    $scope.registration = {
      userName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    $scope.signUp = function () {
      authService.saveRegistration($scope.registration).then(function () {
        $scope.savedSuccessfully = true;
        $scope.message = 'User has been registered successfully';
        startTimer();
      }, function (response) {
        var errors = [];
        for (var key in response.data.modelState) {
          for (var i = 0; i < response.data.modelState[key].length; i++) {
            errors.push(response.data.modelState[key][i]);
          }
        }
        $scope.message = 'Failed to register user due to: ' + errors.join(' ');
      });
    };
    var startTimer = function () {
      var timer = $timeout(function () {
          $timeout.cancel(timer);
          $location.path('/login');
        }, 2000);
    };
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name webUiApp.controller:AddauthorCtrl
 * @description
 * # AddauthorCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp').controller('AuthorCtrl', [
  '$scope',
  'Guideline',
  'Author',
  '$stateParams',
  '$location',
  'toastr',
  'ModalService',
  'Crud',
  function ($scope, Guideline, Author, $stateParams, $location, toastr, ModalService, Crud) {
    var authorId = $stateParams.authorId;
    var guidelineId = $stateParams.guidelineId;
    //Get all authors
    Author.getAuthors().then(function () {
      $scope.authors = Author.authors;
    });
    $scope.updateAuthorBtnClick = function (authorId, arrayIndex) {
      //Get the author we want to edit
      Author.getAuthor(authorId).then(function () {
        var author = Author.author;
        ModalService.showModal({
          templateUrl: 'components/author/_createorupdateauthormodal.html',
          controller: [
            '$scope',
            'author',
            'Author',
            'close',
            function ($scope, author, Author, close) {
              //set this scope's author to the injected author
              $scope.author = author;
              //update author
              $scope.save = function () {
                Author.updateAuthor($scope.author).then(function () {
                  close(500);
                });
              };
            }
          ],
          inputs: { author: author }
        }).then(function (modal) {
          //it's a bootstrap element, use 'modal' to show it
          modal.element.modal();
          modal.close.then(function () {
          });
        });
      });
    };
    $scope.createAuthorBtnClick = function () {
      ModalService.showModal({
        templateUrl: 'components/author/_createorupdateauthormodal.html',
        controller: [
          '$scope',
          'Author',
          'close',
          function ($scope, Author, close) {
            //$scope.author = new Author();
            $scope.save = function () {
              Author.createAuthor($scope.author).then(function () {
                close(500);
              });
            };
          }
        ]
      }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function () {
        });
      });
    };
    $scope.deleteAuthorBtnClick = function (author) {
      Author.deleteAuthor(author);
    };
  }
]);
angular.module('webUiApp').factory('Author', [
  '$resource',
  'apiUrl',
  'toastr',
  'Crud',
  function ($resource, apiUrl, toastr, Crud) {
    var service = {};
    service.authors = [];
    var resource = $resource(apiUrl + 'authors/:_id', {}, { update: { method: 'PUT' } });
    service.getAuthors = function () {
      return resource.query().$promise.then(function (authors) {
        service.authors = authors;
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.getAuthor = function (authorId) {
      return resource.get({ _id: authorId }).$promise.then(function (data) {
        service.author = data;
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.createAuthor = function (author) {
      return resource.save(author).$promise.then(function (data) {
        //update the object
        service.author = data;
        service.authors.push(data);
        toastr.success(data.name, 'Opprettet forfatter');
        return data;
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.updateAuthor = function (author) {
      return resource.update({ _id: service.author.authorId }, author).$promise.then(function (data) {
        toastr.success('Lagret');
        for (var i = 0; i < service.authors.length; i++) {
          if (service.authors[i].authorId == data.authorId) {
            service.authors[i] = data;
          }
        }
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.deleteAuthor = function (author) {
      return resource.delete({ _id: author.authorId }).$promise.then(function () {
        toastr.success('Slettet');
        service.authors.splice(service.authors.indexOf(author), 1);
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    return service;
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name webUiApp.controller:ReferenceCtrl
 * @description
 * # ReferenceCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp').controller('ReferenceCtrl', [
  '$scope',
  'Reference',
  '$stateParams',
  'Recommendation',
  '$location',
  '$timeout',
  'toastr',
  'ModalService',
  'Crud',
  function ($scope, Reference, $stateParams, Recommendation, $location, $timeout, toastr, ModalService, Crud) {
    //Get all references
    Reference.getReferences().then(function () {
      $scope.references = Reference.references;
    });
    $scope.updateReferenceBtnClick = function (referenceId, arrayIndex) {
      //Get the reference we want to edit
      Reference.getReference(referenceId).then(function () {
        var reference = Reference.reference;
        ModalService.showModal({
          templateUrl: 'components/reference/_createorupdatereferencemodal.html',
          controller: [
            '$scope',
            'Reference',
            'reference',
            'index',
            'close',
            function ($scope, Reference, reference, index, close) {
              //set this scope's reference to the injected reference
              $scope.reference = reference;
              //update reference
              $scope.save = function () {
                Reference.updateReference($scope.reference, index).then(function () {
                  close(500);
                });
              };
            }
          ],
          inputs: {
            index: arrayIndex,
            reference: reference
          }
        }).then(function (modal) {
          //it's a bootstrap element, use 'modal' to show it
          modal.element.modal();
          modal.close.then(function () {
          });
        });
      });
    };
    $scope.createReferenceBtnClick = function () {
      ModalService.showModal({
        templateUrl: 'components/reference/_createorupdatereferencemodal.html',
        controller: [
          '$scope',
          'Reference',
          function ($scope, Reference) {
            $scope.save = function () {
              Reference.createReference($scope.reference);
            };
          }
        ]
      }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (result) {
          $scope.references.push(result);
        });
      });
    };
    $scope.deleteReferenceBtnClick = function (reference) {
      Reference.deleteReference(reference);
    };
  }
]);
angular.module('webUiApp').factory('Reference', [
  '$resource',
  'apiUrl',
  'Crud',
  'toastr',
  function ($resource, apiUrl, Crud, toastr) {
    var service = {};
    service.references = [];
    var resource = $resource(apiUrl + 'referances/:_id', {}, { update: { method: 'PUT' } });
    service.getReferences = function () {
      return resource.query().$promise.then(function (data) {
        service.references = data;
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.getReference = function (referenceId) {
      return resource.get({ _id: referenceId }).$promise.then(function (data) {
        service.reference = data;
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.createReference = function (reference) {
      return resource.save(reference).$promise.then(function (data) {
        //update the object
        service.reference = data;
        service.references.push(data);
        toastr.success('Lagret');
        return data;
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.updateReference = function (reference) {
      return resource.update({ _id: reference.referenceId }, reference).$promise.then(function (data) {
        toastr.success('Lagret');
        for (var i = 0; i < service.references.length; i++) {
          if (service.references[i].referenceId == data.referenceId) {
            service.references[i] = data;
          }
        }
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.deleteReference = function (reference) {
      return resource.delete({ _id: reference.referenceId }).$promise.then(function () {
        toastr.success('Slettet');
        //If the recommendation we deleted was the same as the one we're keeping the state of
        if (typeof service.reference != 'undefined' && referenceId === service.reference.referenceId) {
          service.reference = {};
        }
        service.references.splice(service.references.indexOf(reference), 1);
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    return service;
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name webUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp').controller('GuidelinesCtrl', [
  '$scope',
  '$resource',
  'Guideline',
  '$location',
  function ($scope, $resource, Guideline, $location) {
    //Get all the guidelines
    Guideline.getGuidelines().then(function () {
      $scope.guidelines = Guideline.guidelines;
    });
    $scope.addGuidelineBtnClick = function () {
      $location.path('/guideline/0');
    };
    $scope.editGuidelineBtnClick = function (index) {
      $location.path('/guideline/' + index);
    };
    $scope.deleteGuidelineBtnClick = function (guideline) {
      Guideline.deleteGuideline(guideline);
    };
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name webUiApp.controller:GuidelineCtrl
 * @description
 * # GuidelineCtrl
 * Controller of the webUiApp  
 */
angular.module('webUiApp').controller('GuidelineCtrl', [
  '$scope',
  'Guideline',
  'Section',
  'Author',
  '$stateParams',
  '$location',
  'toastr',
  'ModalService',
  '$rootScope',
  function ($scope, Guideline, Section, Author, $stateParams, $location, toastr, ModalService, $rootScope) {
    var guidelineId = $stateParams.guidelineId;
    var baseUrl = '/guideline/';
    $scope.baseUrl = baseUrl;
    if (guidelineId == 0) {
      //$scope.guideline = new Guideline();
      $rootScope.guidelineLabel = ' - ny retningslinje';
    } else {
      Guideline.getGuideline(guidelineId).then(function () {
        $scope.guideline = Guideline.guideline;
      });
    }
    $scope.updateOrCreateGuideline = function () {
      if ($scope.guideline.guidelineId == null) {
        Guideline.saveGuideline($scope.guideline).then(function () {
          $location.path(baseUrl + Guideline.guideline.guidelineId);
        });
      } else {
        Guideline.updateGuideline($scope.guideline).then(function () {
          Guideline.publish($scope.guideline.guidelineId, $scope.guideline.publishedStage);
        });
      }
    };
    $scope.removeGuidelineBtnClick = function () {
      Guideline.deleteGuideline($scope.guideline).then(function () {
        $location.path('/');
      });
    };
    $scope.deleteSectionBtnClick = function (index) {
      var sectionToDelete = Guideline.guideline.sections[index];
      Guideline.deleteSection(sectionToDelete);
    };
    $scope.addSectionBtnClick = function () {
      $location.path(baseUrl + guidelineId + '/section/0');
    };
    $scope.addAuthorBtnClick = function () {
      ModalService.showModal({
        templateUrl: 'components/guidelines/guideline/_authormodal.html',
        controller: [
          'ModalService',
          '$scope',
          'Author',
          'Guideline',
          function (ModalService, $scope, Author, Guideline) {
            $scope.isCollapsed = true;
            function checkCheckboxes() {
              for (var i = $scope.authors.length - 1; i >= 0; i--) {
                //If author is in guideline, make checkbox checked
                if (Guideline.isAuthorInGuideline($scope.authors[i])) {
                  $scope.authors[i].checked = true;
                }
              }
            }
            Author.getAuthors().then(function () {
              $scope.authors = Author.authors;
              checkCheckboxes();
            });
            $scope.openCreateAuthor = function () {
              $scope.isCollapsed = !$scope.isCollapsed;  //$scope.author = new Author();
            };
            $scope.saveAuthor = function () {
              Author.createAuthor($scope.author).then(function () {
                Author.author.checked = true;
                //$scope.author = Author.author;
                //$scope.author.checked = true;
                //$scope.authors.push($scope.author);
                $scope.isCollapsed = true;
              });
            };
            //Called when we close the modal
            $scope.save = function () {
              for (var i = $scope.authors.length - 1; i >= 0; i--) {
                //If checked and not in guideline add author to guideline
                if ($scope.authors[i].checked && !Guideline.isAuthorInGuideline($scope.authors[i])) {
                  Guideline.addAuthor($scope.authors[i]);
                }  //If unchecked remove author from guideline
                else if (!$scope.authors[i].checked && Guideline.isAuthorInGuideline($scope.authors[i])) {
                  Guideline.removeAuthor($scope.authors[i]);
                }
              }
            };
          }
        ]
      }).then(function (modal) {
        modal.element.modal();
      });
    };
    $scope.addAuthorBtnClick.$inject = [
      '$scope',
      'ModalService'
    ];
    $scope.editSortOrderBtnClick = function () {
      ModalService.showModal({
        templateUrl: 'common/_sortordermodal.html',
        controller: [
          'ModalService',
          '$scope',
          'sections',
          'Section',
          function (ModalService, $scope, sections, Section) {
            //set this scope's sections to the injected sections
            $scope.resource = sections;
            $scope.save = function () {
              //Loop through the elements and update if sortorder is changed
              for (var i = 0; i < $scope.resource.length; i++) {
                if ($scope.resource[i].sortOrder != i) {
                  //If we changed the sort order of the element
                  console.log($scope.resource[i].heading + ' changed sortorder from: ' + $scope.resource[i].sortOrder + ' to: ' + i);
                  $scope.resource[i].sortOrder = i;
                  Section.updateSection($scope.resource[i]);
                }
              }
            };
          }
        ],
        inputs: { sections: Guideline.guideline.sections }
      }).then(function (modal) {
        modal.element.modal();
      });
    };
    $scope.editSortOrderBtnClick.$inject = [
      '$scope',
      'ModalService'
    ];
  }
]);
'use strict';
angular.module('webUiApp').factory('Guideline', [
  '$resource',
  'apiUrl',
  'NotificationFactory',
  'Section',
  'apiUrl',
  function ($resource, apiUrl, NotificationFactory, Section) {
    var service = {};
    service.guidelines = [];
    var resource = $resource(apiUrl + 'guidelines/:_id', {}, {
        update: { method: 'PUT' },
        addSection: {
          method: 'POST',
          params: { id: '@id' },
          url: apiUrl + 'guidelines/:id/sections/'
        },
        addAuthor: {
          method: 'PUT',
          params: {
            id: '@id',
            authorId: '@authorId'
          },
          url: apiUrl + 'guidelines/:id/authors/:authorId'
        },
        deleteAuthor: {
          method: 'DELETE',
          params: {
            id: '@id',
            authorId: '@authorId'
          },
          url: apiUrl + 'guidelines/:id/authors/:authorId'
        },
        publish: {
          method: 'PUT',
          params: {
            id: '@id',
            publishedStage: '@publishedStage'
          },
          url: apiUrl + 'guidelines/:id/publish?publishedStage=:publishedStage'
        }
      });
    service.getGuidelines = function () {
      return resource.query().$promise.then(function (guidelines) {
        service.guidelines = guidelines;
      }, function (error) {
        NotificationFactory.handlePostError(error);
      });
    };
    service.deleteGuideline = function (guideline) {
      return resource.delete({ _id: guideline.guidelineId }).$promise.then(function () {
        NotificationFactory.displaySuccess('Slettet');
        if (typeof service.guideline != 'undefined' && service.guideline.guidelineId == guideline.guidelineId) {
          service.guideline = {};
        }
        service.guidelines.splice(service.guidelines.indexOf(guideline), 1);
      }, function (error) {
        NotificationFactory.handlePostError(error);
      });
    };
    service.saveGuideline = function (guideline) {
      return resource.save(guideline).$promise.then(function (data) {
        //update the object
        service.guideline = data;
        NotificationFactory.displaySuccess('Lagret', data.heading);
      }, function (error) {
        NotificationFactory.handlePostError(error);
      });
    };
    service.updateGuideline = function (guidelineToUpdate) {
      return resource.update({ _id: guidelineToUpdate.guidelineId }, guidelineToUpdate).$promise.then(function (data) {
        NotificationFactory.displaySuccess('Lagret', guidelineToUpdate.title);
        service.guideline = data;
      }, function (error) {
        NotificationFactory.handlePostError(error);
      });
    };
    service.getGuideline = function (guidelineID) {
      return resource.get({ _id: guidelineID }).$promise.then(function (data) {
        service.guideline = data;
      }, function (error) {
        NotificationFactory.handlePostError(error);
      });
    };
    service.addSection = function (guidelineId, sectionToAdd) {
      return resource.addSection({ id: guidelineId }, sectionToAdd).$promise.then(function (data) {
        NotificationFactory.displaySuccess('La til seksjon i retningslinje', data.heading);
        service.guideline.sections.push(data);
        return data;
      }, function (error) {
        NotificationFactory.handlePostError(error);
      });
    };
    service.deleteSection = function (sectionToDelete) {
      return Section.deleteSection(sectionToDelete).then(function () {
        service.guideline.sections.splice(service.guideline.sections.indexOf(sectionToDelete), 1);
      });
    };
    service.addAuthor = function (author) {
      return resource.addAuthor({
        id: service.guideline.guidelineId,
        authorId: author.authorId
      }).$promise.then(function () {
        NotificationFactory.displaySuccess('La til forfatter i retningslinje', author.name);
        service.guideline.authors.push(author);
      }, function (error) {
        NotificationFactory.handlePostError(error);
      });
    };
    service.removeAuthor = function (author) {
      return resource.deleteAuthor({
        id: service.guideline.guidelineId,
        authorId: author.authorId
      }).$promise.then(function () {
        NotificationFactory.displaySuccess('Fjernet forfatter fra retningslinjen', author.name);
        //Remove author from list
        for (var i = service.guideline.authors.length - 1; i >= 0; i--) {
          if (service.guideline.authors[i].authorId == author.authorId) {
            service.guideline.authors.splice(i, 1);
          }
        }
      }, function (error) {
        NotificationFactory.handlePostError(error);
      });
    };
    service.isAuthorInGuideline = function (author) {
      var authorInGuideline = false;
      service.guideline.authors.forEach(function (element) {
        if (element.authorId == author.authorId) {
          authorInGuideline = true;
        }
      });
      return authorInGuideline;
    };
    service.publish = function (guidelineId, publishedStage) {
      return resource.publish({
        id: guidelineId,
        publishedStage: publishedStage
      }).$promise.then(function () {
      }, function (error) {
        NotificationFactory.handlePostError(error);
      });
    };
    return service;
  }
]);
'use strict';
/**
 * @ngdoc directive
 * @name webUiApp.directive:authorlist
 * @description
 * # authorlist
 */
angular.module('webUiApp').directive('authorsList', function () {
  return {
    templateUrl: 'components/guidelines/guideline/_authorslist.html',
    restrict: 'E'
  };
});
'use strict';
/**
 * @ngdoc directive
 * @name webUiApp.directive:sectionList
 * @description
 * # sectionList
 */
angular.module('webUiApp').directive('sectionsList', function () {
  return {
    templateUrl: 'components/guidelines/guideline/_sectionslist.html',
    restrict: 'E'
  };
});
'use strict';
/**
 * @ngdoc function
 * @name webUiApp.controller:SectionCtrl
 * @description
 * # SectionCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp').controller('SectionCtrl', [
  '$scope',
  'Section',
  'Guideline',
  'Recommendation',
  '$stateParams',
  '$location',
  'toastr',
  'ModalService',
  '$rootScope',
  function ($scope, Section, Guideline, Recommendation, $stateParams, $location, toastr, ModalService, $rootScope) {
    if ($stateParams.guidelineId) {
      $scope.guidelineId = $stateParams.guidelineId;
    }
    var sectionId = $stateParams.sectionId;
    var guidelineId = $stateParams.guidelineId;
    var parentSectionId = $location.search().parentSectionId;
    var baseUrl = '/guideline/' + guidelineId + '/section/';
    $scope.baseUrl = baseUrl;
    $scope.parentId = 1;
    $rootScope.sectionLabel = ' - ny seksjon';
    if (sectionId != 0) {
      Section.getSection(sectionId).then(function () {
        $scope.section = Section.section;
        $rootScope.sectionLabel = ' - ' + Section.section.heading;
      });
    }
    //If parentsection id is defined we are creating a section under a section
    //else if guidelineId is defined we are creating a section directly under a guideline
    $scope.updateOrCreateSection = function () {
      if (sectionId == 0) {
        //section under section
        if (typeof parentSectionId != 'undefined' && parentSectionId != null) {
          Section.addSection(parentSectionId, $scope.section).then(function () {
            console.log(Section.section.sectionId);
            $location.path(baseUrl + Section.section.sectionId);
          });
        }  //section under guideline
        else if (typeof guidelineId != 'undefined' && guidelineId != null) {
          Guideline.addSection(guidelineId, $scope.section).then(function (data) {
            $location.path(baseUrl + data.sectionId);
          });
        }
      } else {
        Section.updateSection($scope.section).then(function () {
          Section.publish($scope.section.sectionId, $scope.section.publishedStage);
        });
      }
    };
    $scope.addSectionBtnClick = function () {
      $location.path(baseUrl + '0').search('parentSectionId', sectionId);
    };
    $scope.addRecommendationBtnClick = function () {
      $location.path(baseUrl + sectionId + '/recommendation/0');
    };
    $scope.deleteSectionBtnClick = function (index) {
      var sectionToDelete;
      //If deleting childsection
      if (typeof index != 'undefined') {
        sectionToDelete = $scope.section.childSections[index];
      } else {
        sectionToDelete = $scope.section;
      }
      //Delete the section
      Section.deleteSection(sectionToDelete, index).then(function () {
        //If we deleted a section (not childsection)
        if (typeof index == 'undefined') {
          $location.path('/guideline/' + guidelineId);
        }
      });
    };
    $scope.deleteRecommendationBtnClick = function (index) {
      var recommendationToDelete = $scope.section.recommendations[index];
      Section.deleteRecommendation(recommendationToDelete, index);
    };
    $scope.editSortOrderRecommendationBtnClick = function () {
      ModalService.showModal({
        templateUrl: 'common/_sortordermodal.html',
        controller: [
          'ModalService',
          '$scope',
          'recommendations',
          'Recommendation',
          function (ModalService, $scope, recommendations, Recommendation) {
            //set this scope's recommendations to the injected recommendations
            $scope.resource = recommendations;
            $scope.save = function () {
              //Loop through the elements and update if sortorder is changed
              for (var i = 0; i < $scope.resource.length; i++) {
                if ($scope.resource[i].sortOrder != i) {
                  //If we changed the sort order of the element
                  console.log($scope.resource[i].heading + ' changed sortorder from: ' + $scope.resource[i].sortOrder + ' to: ' + i);
                  $scope.resource[i].sortOrder = i;
                  Recommendation.updateRecommendation($scope.resource[i]);
                }
              }
            };
          }
        ],
        inputs: { recommendations: $scope.section.recommendations }
      }).then(function (modal) {
        modal.element.modal();
      });
    };
    $scope.editSortOrderRecommendationBtnClick.$inject = [
      '$scope',
      'ModalService'
    ];
    $scope.editSortOrderSubsectionsBtnClick = function () {
      ModalService.showModal({
        templateUrl: 'common/_sortordermodal.html',
        controller: [
          'ModalService',
          '$scope',
          'sections',
          'Section',
          function (ModalService, $scope, sections, Section) {
            //set this scope's sections to the injected sections
            $scope.resource = sections;
            $scope.save = function () {
              //Loop through the elements and update if sortorder is changed
              for (var i = 0; i < $scope.resource.length; i++) {
                if ($scope.resource[i].sortOrder != i) {
                  //If we changed the sort order of the element
                  console.log($scope.resource[i].heading + ' changed sortorder from: ' + $scope.resource[i].sortOrder + ' to: ' + i);
                  $scope.resource[i].sortOrder = i;
                  Section.updateSection($scope.resource[i]);
                }
              }
            };
          }
        ],
        inputs: { sections: $scope.section.childSections }
      }).then(function (modal) {
        modal.element.modal();
      });
    };
    $scope.editSortOrderSubsectionsBtnClick.$inject = [
      '$scope',
      'ModalService'
    ];
  }
]);
angular.module('webUiApp').factory('Section', [
  '$resource',
  'apiUrl',
  'NotificationFactory',
  'Recommendation',
  function ($resource, apiUrl, NotificationFactory, Recommendation) {
    var service = {};
    service.section = {};
    service.section.recommendations = [];
    var resource = $resource(apiUrl + 'sections/:_id', {}, {
        update: { method: 'PUT' },
        addSection: {
          method: 'POST',
          params: { id: '@id' },
          url: apiUrl + 'sections/:id/sections/'
        },
        addRecommendation: {
          method: 'POST',
          params: { id: '@id' },
          url: apiUrl + 'sections/:id/recommendations/'
        },
        publish: {
          method: 'PUT',
          params: {
            id: '@id',
            publishedStage: '@publishedStage'
          },
          url: apiUrl + 'sections/:id/publish?publishedStage=:publishedStage'
        }
      });
    service.getSection = function (sectionId) {
      return resource.get({ _id: sectionId }).$promise.then(function (data) {
        service.section = data;  //$location.path(baseUrl + data.sectionId);
      }, function (error) {
        NotificationFactory.handlePostError(error);
      });
    };
    service.createSection = function (section) {
      return resource.save(section).$promise.then(function (data) {
        //update the object
        service.section = data;
        NotificationFactory.displaySuccess('Lagret', data.heading);
      }, function (error) {
        NotificationFactory.handlePostError(error);
      });
    };
    service.deleteSection = function (sectionToDelete, index) {
      return resource.delete({ _id: sectionToDelete.sectionId }).$promise.then(function () {
        NotificationFactory.displaySuccess('Slettet', sectionToDelete.heading);
        //If we deleted the section object we are using
        if (sectionToDelete.sectionId == service.section.sectionId) {
          service.section = {};
        }
        //If it was a childsection
        if (typeof index !== 'undefined') {
          service.section.childSections.splice(index, 1);
        }
      }, function (error) {
        NotificationFactory.handlePostError(error);
      });
    };
    service.updateSection = function (sectionToUpdate) {
      return resource.update({ _id: sectionToUpdate.sectionId }, sectionToUpdate).$promise.then(function (data) {
        service.section = data;
        NotificationFactory.displaySuccess('Lagret', sectionToUpdate.heading);
      }, function (error) {
        NotificationFactory.handlePostError(error);
      });
    };
    service.addSection = function (parentSectionId, sectionToAdd) {
      return resource.addSection({ id: parentSectionId }, sectionToAdd).$promise.then(function (data) {
        NotificationFactory.displaySuccess('La til underseksjon', data.heading);
        service.section = data;  //$location.path(baseUrl + data.sectionId);
      }, function (error) {
        NotificationFactory.handlePostError(error);
      });
    };
    service.addRecommendation = function (sectionId, recommendation) {
      return resource.addRecommendation({ id: sectionId }, recommendation).$promise.then(function (data) {
        NotificationFactory.displaySuccess('La til anbefaling', data.heading);
        service.section.recommendations.push(data);
        return data;
      }, function (error) {
        NotificationFactory.handlePostError(error);
      });
    };
    service.deleteRecommendation = function (recommendationToDelete, index) {
      return Recommendation.deleteRecommendation(recommendationToDelete).then(function () {
        service.section.recommendations.splice(index, 1);
      });
    };
    service.publish = function (sectionId, publishedStage) {
      return resource.publish({
        id: sectionId,
        publishedStage: publishedStage
      }).$promise.then(function () {
      }, function (error) {
        NotificationFactory.handlePostError(error);
      });
    };
    return service;
  }
]);
'use strict';
/**
 * @ngdoc directive
 * @name webUiApp.directive:subsectionsList
 * @description
 * # subsectionsList
 */
angular.module('webUiApp').directive('subsectionsList', function () {
  return {
    templateUrl: 'components/guidelines/guideline/section/_subsectionslist.html',
    restrict: 'E'
  };
});
'use strict';
/**
 * @ngdoc directive
 * @name webUiApp.directive:recommendationsList
 * @description
 * # recommendationsList
 */
angular.module('webUiApp').directive('recommendationsList', function () {
  return {
    templateUrl: 'components/guidelines/guideline/section/_recommendationslist.html',
    restrict: 'E'
  };
});
'use strict';
/**
 * @ngdoc function
 * @name webUiApp.controller:RecommendationCtrl
 * @description
 * # RecommendationCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp').controller('RecommendationCtrl', [
  '$scope',
  'Recommendation',
  'Pico',
  'EmrInfo',
  'Reference',
  'KeyInfo',
  '$stateParams',
  '$location',
  'Section',
  'toastr',
  'ModalService',
  '$rootScope',
  'Crud',
  function ($scope, Recommendation, Pico, EmrInfo, Reference, KeyInfo, $stateParams, $location, Section, toastr, ModalService, $rootScope, Crud) {
    $scope.guidelineId = $stateParams.guidelineId;
    $scope.sectionId = $stateParams.sectionId;
    var guidelineId = $stateParams.guidelineId;
    var recommendationId = $stateParams.recommendationId;
    var sectionId = $stateParams.sectionId;
    if (recommendationId != 0) {
      Recommendation.getRecommendation(recommendationId).then(function () {
        $scope.recommendation = Recommendation.recommendation;
        if ($scope.recommendation.strength == null) {
          $scope.recommendation.strength = 'null';
        }
        $rootScope.recommendationLabel = ' - ' + Recommendation.recommendation.heading;  //update breadcrumb
      });
    } else {
      //$scope.recommendation = new Recommendation();
      //$scope.recommendation.strength = 'null';
      $rootScope.recommendationLabel = ' - ny anbefaling';  //update breadcrumb
    }
    $scope.updateOrCreateRecommendation = function () {
      if (recommendationId != 0) {
        Recommendation.updateRecommendation($scope.recommendation).then(function () {
          Recommendation.publish($scope.recommendation.recommendationId, $scope.recommendation.publishedStage);
        });
      } else if (typeof sectionId != 'undefined' && sectionId != null) {
        Section.addRecommendation(sectionId, $scope.recommendation).then(function (data) {
          $location.path('/guideline/' + guidelineId + '/section/' + sectionId + '/recommendation/' + data.recommendationId);
        });
      }
    };
    $scope.deleteRecommendationBtnClick = function () {
      Recommendation.deleteRecommendation($scope.recommendation).then(function () {
        $location.path('/guideline/' + guidelineId + '/section/' + sectionId);
      });
    };
    $scope.addPicoBtnClick = function () {
      $location.path('/guideline/' + guidelineId + '/section/' + sectionId + '/recommendation/' + recommendationId + '/pico/0');
    };
    $scope.deletePicoBtnClick = function (index) {
      Recommendation.deletePico($scope.recommendation.picos[index]);
    };
    $scope.addEmrInfoBtnClick = function () {
      $location.path('/guideline/' + guidelineId + '/section/' + sectionId + '/recommendation/' + recommendationId + '/emrinfo/0');
    };
    $scope.deleteEmrInfoBtnClick = function (index) {
      Recommendation.deleteEmrInfo($scope.recommendation.emrInfo[index]);
    };
    $scope.addKeyInfoBtnClick = function () {
      $location.path('/guideline/' + guidelineId + '/section/' + sectionId + '/recommendation/' + recommendationId + '/keyinfo/0');
    };
    $scope.deleteKeyInfoBtnClick = function (index) {
      Recommendation.deleteKeyInfo($scope.recommendation.keyInfo[index]);
    };
    $scope.editReferencesBtnClick = function () {
      ModalService.showModal({
        templateUrl: 'components/guidelines/guideline/section/recommendation/_referencesmodal.html',
        controller: [
          'ModalService',
          '$scope',
          'Reference',
          function (ModalService, $scope, Reference) {
            $scope.isCollapsed = true;
            Reference.getReferences().then(function () {
              $scope.references = Reference.references;
              for (var i = $scope.references.length - 1; i >= 0; i--) {
                //If reference is in recommendation, make checkbox checked
                if (isReferenceInRecommendation($scope.references[i])) {
                  $scope.references[i].checked = true;
                }
              }
            });
            $scope.save = function () {
              for (var i = $scope.references.length - 1; i >= 0; i--) {
                //If checked and not in recommendation add reference to recommendation
                if ($scope.references[i].checked && !isReferenceInRecommendation($scope.references[i])) {
                  addReferenceToRecommendation($scope.references[i]);
                }  //If unchecked remove reference from recommendation
                else if (!$scope.references[i].checked && isReferenceInRecommendation($scope.references[i])) {
                  removeReferenceFromRecommendation($scope.references[i]);
                }
              }
            };
            $scope.openCreateReference = function () {
              $scope.isCollapsed = !$scope.isCollapsed;  //$scope.reference = new Reference();
            };
            $scope.saveReference = function () {
              //$scope.author = new Author();
              Reference.createReference($scope.reference).then(function (data) {
                data.checked = true;
                $scope.isCollapsed = true;
              });
            };
          }
        ]
      }).then(function (modal) {
        modal.element.modal();
      });
    };
    $scope.editReferencesBtnClick.$inject = [
      '$scope',
      'ModalService'
    ];
    //Check if reference passed is in this recommendation's collection of references
    function isReferenceInRecommendation(reference) {
      for (var i = $scope.recommendation.references.length - 1; i >= 0; i--) {
        if ($scope.recommendation.references[i].referenceId == reference.referenceId) {
          return true;
        }
      }
    }
    function addReferenceToRecommendation(reference) {
      Recommendation.addReference(reference);
    }
    function removeReferenceFromRecommendation(reference) {
      Recommendation.removeReference(reference.referenceId);
    }
  }
]);
angular.module('webUiApp').factory('Recommendation', [
  '$resource',
  'apiUrl',
  'toastr',
  'Crud',
  'Pico',
  'EmrInfo',
  'KeyInfo',
  function ($resource, apiUrl, toastr, Crud, Pico, EmrInfo, KeyInfo) {
    var service = {};
    service.recommendation = {
      picos: [],
      emrInfo: [],
      keyInfo: []
    };
    var resource = $resource(apiUrl + 'recommendations/:_id', {}, {
        update: { method: 'PUT' },
        addPico: {
          method: 'POST',
          params: { id: '@id' },
          url: apiUrl + 'recommendations/:id/picos/'
        },
        addEmrInfo: {
          method: 'POST',
          params: { id: '@id' },
          url: apiUrl + 'recommendations/:id/emrinfos/'
        },
        addKeyInfo: {
          method: 'POST',
          params: { id: '@id' },
          url: apiUrl + 'recommendations/:id/keyinfo/'
        },
        addReference: {
          method: 'PUT',
          params: {
            id: '@id',
            referenceId: '@referenceId'
          },
          url: apiUrl + 'recommendations/:id/references/:referenceId'
        },
        deleteReference: {
          method: 'DELETE',
          params: {
            id: '@id',
            referenceId: '@referenceId'
          },
          url: apiUrl + 'recommendations/:id/references/:referenceId'
        },
        publish: {
          method: 'PUT',
          params: {
            id: '@id',
            publishedStage: '@publishedStage'
          },
          url: apiUrl + 'recommendations/:id/publish?publishedStage=:publishedStage'
        }
      });
    service.updateRecommendation = function (recommendationToUpdate) {
      return resource.update({ _id: recommendationToUpdate.recommendationId }, recommendationToUpdate).$promise.then(function (data) {
        toastr.success(recommendationToUpdate.heading, 'Lagret');
        service.recommendation = data;
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.getRecommendation = function (recommendationId) {
      return resource.get({ _id: recommendationId }).$promise.then(function (data) {
        service.recommendation = data;  //$location.path(baseUrl + data.sectionId);
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.deleteRecommendation = function (recommendationToDelete) {
      return resource.delete({ _id: recommendationToDelete.recommendationId }).$promise.then(function () {
        toastr.success(recommendationToDelete.heading, 'Slettet');
        //If the recommendation we deleted was the same as the one we're keeping the state of
        if (recommendationToDelete.recommendationId === service.recommendation.recommendationId) {
          service.recommendation = {};
        }
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.addPico = function (recommendationId, pico) {
      return resource.addPico({ id: recommendationId }, pico).$promise.then(function (data) {
        toastr.success('La til pico');
        if (recommendationId == service.recommendation.recommendationId) {
          service.recommendation.picos.push(data);
        }
        return data;
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.deletePico = function (picoToDelete) {
      return Pico.deletePico(picoToDelete).then(function () {
        service.recommendation.picos.splice(service.recommendation.picos.indexOf(picoToDelete), 1);
      });
    };
    service.addEmrInfo = function (recommendationId, emrInfo) {
      return resource.addEmrInfo({ id: recommendationId }, emrInfo).$promise.then(function (data) {
        toastr.success('La til emrInfo');
        if (recommendationId == service.recommendation.recommendationId) {
          service.recommendation.emrInfo.push(data);
        }
        return data;
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.deleteEmrInfo = function (emrInfoTodelete) {
      return EmrInfo.deleteEmrInfo(emrInfoTodelete.emrInfoId).then(function () {
        service.recommendation.emrInfo.splice(service.recommendation.emrInfo.indexOf(emrInfoTodelete), 1);
      });
    };
    service.addKeyInfo = function (recommendationId, keyInfo) {
      return resource.addKeyInfo({ id: recommendationId }, keyInfo).$promise.then(function (data) {
        toastr.success('La til keyInfo');
        if (recommendationId == service.recommendation.recommendationId) {
          service.recommendation.keyInfo.push(data);
        }
        return data;
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.deleteKeyInfo = function (keyInfo) {
      return KeyInfo.deleteKeyInfo(keyInfo.keyInfoId).then(function () {
        service.recommendation.keyInfo.splice(service.recommendation.keyInfo.indexOf(keyInfo), 1);
      });
    };
    service.addReference = function (reference) {
      return resource.addReference({
        id: service.recommendation.recommendationId,
        referenceId: reference.referenceId
      }).$promise.then(function () {
        toastr.success('La til referanse i anbefaling');
        service.recommendation.references.push(reference);
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.removeReference = function (referenceId) {
      return resource.deleteReference({
        id: service.recommendation.recommendationId,
        referenceId: referenceId
      }).$promise.then(function () {
        toastr.success('Fjernet referanse fra anbefalingen');
        //Remove reference from list
        for (var i = service.recommendation.references.length - 1; i >= 0; i--) {
          if (service.recommendation.references[i].referenceId == referenceId) {
            service.recommendation.references.splice(i, 1);
          }
        }
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.publish = function (recommendationId, publishedStage) {
      return resource.publish({
        id: recommendationId,
        publishedStage: publishedStage
      }).$promise.then(function () {
        if (typeof service.recommendation != 'undefined' && recommendationId == service.recommendation.recommendationId) {
          service.recommendation.publishedStage = publishedStage;
        }
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    return service;
  }
]);
'use strict';
/**
 * @ngdoc directive
 * @name webUiApp.directive:emrinfoList
 * @description
 * # emrinfoList
 */
angular.module('webUiApp').directive('emrinfoList', function () {
  return {
    templateUrl: 'components/guidelines/guideline/section/recommendation/_emrinfolist.html',
    restrict: 'E'
  };
});
'use strict';
/**
 * @ngdoc directive
 * @name webUiApp.directive:keyinfoList
 * @description
 * # keyinfoList
 */
angular.module('webUiApp').directive('keyinfoList', function () {
  return {
    templateUrl: 'components/guidelines/guideline/section/recommendation/_keyinfolist.html',
    restrict: 'E'
  };
});
'use strict';
/**
 * @ngdoc directive
 * @name webUiApp.directive:picosList
 * @description
 * # picosList
 */
angular.module('webUiApp').directive('picosList', function () {
  return {
    templateUrl: 'components/guidelines/guideline/section/recommendation/_picoslist.html',
    restrict: 'E'
  };
});
'use strict';
/**
 * @ngdoc directive
 * @name webUiApp.directive:referencesList
 * @description
 * # referencesList
 */
angular.module('webUiApp').directive('referencesList', function () {
  return {
    templateUrl: 'components/guidelines/guideline/section/recommendation/_referenceslist.html',
    restrict: 'E'
  };
});
'use strict';
/**
 * @ngdoc function
 * @name webUiApp.controller:EmrInfoCtrl
 * @description
 * # EmrInfoCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp').controller('EmrInfoCtrl', [
  '$scope',
  'EmrInfo',
  '$stateParams',
  'Recommendation',
  '$location',
  '$timeout',
  'toastr',
  'Crud',
  function ($scope, EmrInfo, $stateParams, Recommendation, $location, $timeout, toastr, Crud) {
    var guidelineId = $stateParams.guidelineId;
    var sectionId = $stateParams.sectionId;
    var recommendationId = $stateParams.recommendationId;
    var emrInfoId = $stateParams.emrInfoId;
    if (emrInfoId != 0) {
      EmrInfo.getEmrInfo(emrInfoId).then(function () {
        $scope.emrInfo = EmrInfo.emrInfo;
      });
    }
    $scope.updateOrCreateEmrInfo = function () {
      if (emrInfoId != 0) {
        EmrInfo.updateEmrInfo($scope.emrInfo);
      } else if (typeof recommendationId != 'undefined' && recommendationId != null) {
        Recommendation.addEmrInfo(recommendationId, $scope.emrInfo).then(function (data) {
          $location.path('/guideline/' + guidelineId + '/section/' + sectionId + '/recommendation/' + recommendationId + '/emrinfo/' + data.emrInfoId);
        });
      }
    };
    $scope.deleteEmrInfoBtnClick = function () {
      EmrInfo.deleteEmrInfo($scope.emrInfo.emrInfoId).then(function () {
        $location.path('/guideline/' + guidelineId + '/section/' + sectionId + '/recommendation/' + recommendationId);
      });
    };
  }
]);
'use strict';
angular.module('webUiApp').factory('EmrInfo', [
  '$resource',
  'apiUrl',
  'toastr',
  'Crud',
  function ($resource, apiUrl, toastr, Crud) {
    var service = {};
    var resource = $resource(apiUrl + 'emrinfos/:_id', {}, { update: { method: 'PUT' } });
    service.getEmrInfo = function (emrInfoId) {
      return resource.get({ _id: emrInfoId }).$promise.then(function (data) {
        service.emrInfo = data;  //$location.path(baseUrl + data.sectionId);
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.updateEmrInfo = function (emrInfo) {
      return resource.update({ _id: emrInfo.emrInfoId }, emrInfo).$promise.then(function () {
        toastr.success('Lagret');
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.deleteEmrInfo = function (id) {
      return resource.delete({ _id: id }).$promise.then(function () {
        toastr.success('Slettet');
        //If the recommendation we deleted was the same as the one we're keeping the state of
        if (typeof service.emrInfo != 'undefined' && id === service.emrInfo.emrInfoId) {
          service.emrInfo = {};
        }
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    return service;
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name webUiApp.controller:KeyInfoCtrl
 * @description
 * # KeyInfoCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp').controller('KeyInfoCtrl', [
  '$scope',
  'KeyInfo',
  '$stateParams',
  'Recommendation',
  '$location',
  function ($scope, KeyInfo, $stateParams, Recommendation, $location) {
    var guidelineId = $stateParams.guidelineId;
    var sectionId = $stateParams.sectionId;
    var recommendationId = $stateParams.recommendationId;
    var keyInfoId = $stateParams.keyInfoId;
    if (keyInfoId != 0) {
      KeyInfo.getKeyInfo(keyInfoId).then(function () {
        $scope.keyInfo = KeyInfo.keyInfo;
      });
    }
    $scope.updateOrCreateKeyInfo = function () {
      if (keyInfoId != 0) {
        KeyInfo.updateKeyInfo($scope.keyInfo);
      } else if (typeof recommendationId != 'undefined' && recommendationId != null) {
        Recommendation.addKeyInfo(recommendationId, $scope.keyInfo).then(function (data) {
          $location.path('/guideline/' + guidelineId + '/section/' + sectionId + '/recommendation/' + recommendationId + '/keyinfo/' + data.keyInfoId);
        });
      }
    };
    $scope.deleteKeyInfoBtnClick = function () {
      KeyInfo.deleteKeyInfo($scope.keyInfo.keyInfoId).then(function () {
        $location.path('/guideline/' + guidelineId + '/section/' + sectionId + '/recommendation/' + recommendationId);
      });
    };
  }
]);
'use strict';
angular.module('webUiApp').factory('KeyInfo', [
  '$resource',
  'apiUrl',
  'toastr',
  'Crud',
  function ($resource, apiUrl, toastr, Crud) {
    var service = {};
    var resource = $resource(apiUrl + 'keyinfos/:_id', {}, { update: { method: 'PUT' } });
    service.getKeyInfo = function (keyInfoId) {
      return resource.get({ _id: keyInfoId }).$promise.then(function (data) {
        service.keyInfo = data;  //$location.path(baseUrl + data.sectionId);
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.updateKeyInfo = function (keyInfo) {
      return resource.update({ _id: keyInfo.keyInfoId }, keyInfo).$promise.then(function () {
        toastr.success('Lagret');
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.deleteKeyInfo = function (keyInfoId) {
      return resource.delete({ _id: keyInfoId }).$promise.then(function () {
        toastr.success('Slettet');
        //If the recommendation we deleted was the same as the one we're keeping the state of
        if (typeof service.keyInfo != 'undefined' && keyInfoId === service.keyInfo.keyInfoId) {
          service.keyInfo = {};
        }
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    return service;
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name webUiApp.controller:PicoCtrl
 * @description
 * # PicoCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp').controller('PicoCtrl', [
  '$scope',
  'Pico',
  'PicoCode',
  'PicoOutcome',
  '$stateParams',
  'Recommendation',
  '$location',
  '$timeout',
  'toastr',
  'Crud',
  'ModalService',
  function ($scope, Pico, PicoCode, PicoOutcome, $stateParams, Recommendation, $location, $timeout, toastr, Crud, ModalService) {
    var guidelineId = $stateParams.guidelineId;
    var sectionId = $stateParams.sectionId;
    var recommendationId = $stateParams.recommendationId;
    var picoId = $stateParams.picoId;
    var baseUrl = '/guideline/' + guidelineId + '/section/' + sectionId + '/recommendation/' + recommendationId + '/pico/';
    $scope.baseUrl = baseUrl;
    if (picoId != 0) {
      Pico.getPico(picoId).then(function () {
        $scope.pico = Pico.pico;
      });
    }
    $scope.updateOrCreatePico = function () {
      if (picoId != 0) {
        Pico.updatePico($scope.pico);
      } else if (typeof recommendationId != 'undefined' && recommendationId != null) {
        Recommendation.addPico(recommendationId, $scope.pico).then(function (data) {
          $location.path(baseUrl + data.picoId);
        });
      }
    };
    $scope.addPicoCodeBtnClick = function () {
      $location.path(baseUrl + picoId + '/picoCode/0');
    };
    $scope.deletePicoCodeBtnClick = function (index) {
      Pico.deletePicoCode(index);
    };
    $scope.addPicoOutcomeBtnClick = function () {
      $location.path(baseUrl + picoId + '/picooutcome/0');
    };
    $scope.deletePicoOutcomeBtnClick = function (index) {
      Pico.deletePicoOutcome(index);
    };
    $scope.deletePicoBtnClick = function () {
      Pico.deletePico(Pico.pico).then(function () {
        $location.path('/guideline/' + guidelineId + '/section/' + sectionId + '/recommendation/' + recommendationId);
      });
    };
    $scope.taxCodeBtnClick = function (picoType) {
      ModalService.showModal({
        templateUrl: 'components/guidelines/guideline/section/recommendation/pico/_taxonomycodemodal.html',
        controller: [
          '$scope',
          'close',
          'picoId',
          'picoType',
          'PicoCode',
          'Pico',
          'TaxonomyCode',
          function ($scope, close, picoId, picoType, PicoCode, Pico, TaxonomyCode) {
            //start with form collapsed
            $scope.isCollapsed = true;
            $scope.picoType = picoType;
            //create new objects
            //$scope.taxonomyCode = new TaxonomyCode();
            //$scope.picoCode = new PicoCode();
            $scope.picoCodes = [];
            var addPicoCodes = function (pico) {
              var picoCodes = [];
              //Add all the picoCodes which are the picotype we are using
              //(population = 0, intervention = 1, control = 2, outcome = 3)
              for (var i = 0; i < pico.picoCodes.length; i++) {
                if (pico.picoCodes[i].picoType == picoType) {
                  picoCodes.push(pico.picoCodes[i]);
                }
              }
              return picoCodes;
            };
            //get the pico
            var pico;
            Pico.getPico(picoId).then(function () {
              pico = Pico.pico;
              $scope.picoCodes = addPicoCodes(pico);
              //If the list is empty, open the accordion
              if ($scope.picoCodes.length == 0) {
                $scope.isCollapsed = false;
              } else {
                $scope.isCollapsed = true;
              }
            });
            $scope.openCreateCode = function () {
              $scope.isCollapsed = !$scope.isCollapsed;
            };
            $scope.removeTaxonomyCodeBtnClick = function (parentIndex, index) {
              var taxonomyCodeToDelete = $scope.picoCodes[parentIndex].taxonomyCodes[index];
              TaxonomyCode.deleteTaxonomyCode(taxonomyCodeToDelete.taxonomyCodeId).then(function () {
                $scope.picoCodes[parentIndex].taxonomyCodes.splice(index, 1);
              });
            };
            $scope.saveCode = function () {
              $scope.taxonomyCode.schemaSystem = $scope.picoCode.ontologyName;
              $scope.taxonomyCode.schemaId = $scope.picoCode.ontologyName;
              $scope.picoCode.picoType = picoType;
              //Add taxonomyCode
              var addTaxonomyCode = function (picoCodeId, arrayIndex) {
                PicoCode.addTaxonomyCode(picoCodeId, $scope.taxonomyCode).then(function (data) {
                  $scope.picoCodes[arrayIndex].taxonomyCodes.push(data);
                });
              };
              //Check if picocode ontologyname already exists.
              var picoCodeId = 0;
              var arrayIndex = 0;
              for (var i = 0; i < $scope.picoCodes.length; i++) {
                if ($scope.picoCodes[i].ontologyName == $scope.picoCode.ontologyName) {
                  picoCodeId = $scope.picoCodes[i].picoCodeId;
                  arrayIndex = i;
                }
              }
              //If picocode ontologyname not found, create new picocode and add the taxonomyCode
              if (picoCodeId == 0) {
                Pico.addPicoCode(picoId, $scope.picoCode).then(function (data) {
                  $scope.picoCodes.push(data);
                  //create new taxonomy codes array
                  $scope.picoCodes[$scope.picoCodes.length - 1].taxonomyCodes = [];
                  addTaxonomyCode(data.picoCodeId, $scope.picoCodes.length - 1);
                });
              } else {
                //Add taxonomycode to existing picocode
                addTaxonomyCode(picoCodeId, arrayIndex);
              }
              $scope.isCollapsed = true;
            };
          }
        ],
        inputs: {
          picoId: $scope.pico.picoId,
          picoType: picoType
        }
      }).then(function (modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function () {
        });
      });
    };
  }
]);
angular.module('webUiApp').factory('Pico', [
  '$resource',
  'apiUrl',
  'toastr',
  'Crud',
  'PicoCode',
  'PicoOutcome',
  function ($resource, apiUrl, toastr, Crud, PicoCode, PicoOutcome) {
    var service = {};
    var resource = $resource(apiUrl + 'picos/:_id', {}, {
        update: { method: 'PUT' },
        addPicoCode: {
          method: 'POST',
          params: { id: '@id' },
          url: apiUrl + 'picos/:id/picocodes/'
        },
        addPicoOutcome: {
          method: 'POST',
          params: { id: '@id' },
          url: apiUrl + 'picos/:id/picooutcomes/'
        }
      });
    service.getPico = function (picoId) {
      return resource.get({ _id: picoId }).$promise.then(function (data) {
        service.pico = data;  //$location.path(baseUrl + data.sectionId);
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.updatePico = function (pico) {
      return resource.update({ _id: pico.picoId }, pico).$promise.then(function () {
        toastr.success('Lagret');
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.deletePico = function (picoToDelete) {
      return resource.delete({ _id: picoToDelete.picoId }).$promise.then(function () {
        toastr.success('Slettet');
        //If the recommendation we deleted was the same as the one we're keeping the state of
        if (typeof service.pico != 'undefined' && picoToDelete.picoId === service.pico.picoId) {
          service.pico = {};
        }
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.addPicoCode = function (picoId, picoCode) {
      return resource.addPicoCode({ id: picoId }, picoCode).$promise.then(function (data) {
        toastr.success('La til pico kode');
        return data;
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.deletePicoCode = function (index) {
      var picoCode = service.pico.picoCodes[index];
      PicoCode.deletePicoCode(picoCode).then(function () {
        service.pico.picoCodes.splice(index, 1);
      });
    };
    service.addPicoOutcome = function (picoId, picoOutcome) {
      return resource.addPicoOutcome({ id: picoId }, picoOutcome).$promise.then(function (data) {
        toastr.success('La til pico outcome');
        return data;
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.deletePicoOutcome = function (index) {
      var picoOutcome = service.pico.picoOutcomes[index];
      PicoOutcome.deletePicoOutcome(picoOutcome).then(function () {
        service.pico.picoOutcomes.splice(index, 1);
      });
    };
    return service;
  }
]);
'use strict';
/**
 * @ngdoc directive
 * @name webUiApp.directive:picocodesList
 * @description
 * # picocodesList
 */
angular.module('webUiApp').directive('picocodesList', function () {
  return {
    templateUrl: 'components/guidelines/guideline/section/recommendation/pico/_picocodeslist.html',
    restrict: 'E'
  };
});
'use strict';
/**
 * @ngdoc directive
 * @name webUiApp.directive:picooutcomesList
 * @description
 * # picooutcomesList
 */
angular.module('webUiApp').directive('picooutcomesList', function () {
  return {
    templateUrl: 'components/guidelines/guideline/section/recommendation/pico/_picooutcomeslist.html',
    restrict: 'E'
  };
});
'use strict';
/**
 * @ngdoc function
 * @name webUiApp.controller:PicoOutcomeCtrl
 * @description
 * # PicoOutcomeCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp').controller('PicoOutcomeCtrl', [
  '$scope',
  'PicoOutcome',
  '$stateParams',
  'Pico',
  '$location',
  '$timeout',
  'toastr',
  'Crud',
  function ($scope, PicoOutcome, $stateParams, Pico, $location, $timeout, toastr, Crud) {
    var guidelineId = $stateParams.guidelineId;
    var sectionId = $stateParams.sectionId;
    var recommendationId = $stateParams.recommendationId;
    var picoId = $stateParams.picoId;
    var picoOutcomeId = $stateParams.picoOutcomeId;
    var baseUrl = '/guideline/' + guidelineId + '/section/' + sectionId + '/recommendation/' + recommendationId + '/pico/' + picoId + '/picooutcome/';
    $scope.baseUrl = baseUrl;
    Pico.getPico(picoId).then(function () {
      $scope.pico = Pico.pico;
    });
    if (picoOutcomeId != 0) {
      PicoOutcome.getPicoOutcome(picoOutcomeId).then(function () {
        $scope.picoOutcome = PicoOutcome.picoOutcome;
      });
    }
    $scope.updateOrCreatePicoOutcome = function () {
      if (picoOutcomeId != 0) {
        PicoOutcome.updatePicoOutcome($scope.picoOutcome);
      } else if (typeof picoId != 'undefined' && picoId != null) {
        Pico.addPicoOutcome(picoId, $scope.picoOutcome).then(function (data) {
          $location.path(baseUrl + data.picoOutcomeId);
        });
      }
    };
    $scope.deletePicoOutcomeBtnClick = function () {
      PicoOutcome.deletePicoOutcome($scope.picoOutcome).then(function () {
        $location.path('/guideline/' + guidelineId + '/section/' + sectionId + '/recommendation/' + recommendationId + '/pico/' + picoId);
      });
    };
  }
]);
'use strict';
angular.module('webUiApp').factory('PicoOutcome', [
  '$resource',
  'apiUrl',
  'Crud',
  'toastr',
  function ($resource, apiUrl, Crud, toastr) {
    var service = {};
    var resource = $resource(apiUrl + 'picooutcomes/:_id', {}, { update: { method: 'PUT' } });
    service.getPicoOutcome = function (picoOutcomeId) {
      return resource.get({ _id: picoOutcomeId }).$promise.then(function (data) {
        service.picoOutcome = data;  //$location.path(baseUrl + data.sectionId);
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.updatePicoOutcome = function (picoOutcome) {
      return resource.update({ _id: picoOutcome.picoOutcomeId }, picoOutcome).$promise.then(function () {
        toastr.success('Lagret');
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.deletePicoOutcome = function (picoOutcome) {
      return resource.delete({ _id: picoOutcome.picoOutcomeId }).$promise.then(function () {
        toastr.success('Slettet');
        //If the recommendation we deleted was the same as the one we're keeping the state of
        if (picoOutcome.picoOutcomeId === service.picoOutcome.picoOutcomeId) {
          service.picoOutcome = {};
        }
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    return service;
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name webUiApp.controller:PicocodeCtrl
 * @description
 * # PicocodeCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp').controller('PicocodeCtrl', [
  '$scope',
  'PicoCode',
  'TaxonomyCode',
  '$stateParams',
  'Pico',
  '$location',
  '$timeout',
  'toastr',
  'Crud',
  function ($scope, PicoCode, TaxonomyCode, $stateParams, Pico, $location, $timeout, toastr, Crud) {
    var guidelineId = $stateParams.guidelineId;
    var sectionId = $stateParams.sectionId;
    var recommendationId = $stateParams.recommendationId;
    var picoCodeId = $stateParams.picoCodeId;
    var picoId = $stateParams.picoId;
    var baseUrl = '/guideline/' + guidelineId + '/section/' + sectionId + '/recommendation/' + recommendationId + '/pico/' + picoId + '/picoCode/';
    $scope.baseUrl = baseUrl;
    if (picoCodeId != 0) {
      PicoCode.get({ _id: picoCodeId }, function (data) {
        $scope.picoCode = data;
      });
    }
    $scope.updateOrCreatePicoCode = function () {
      if (picoCodeId != 0) {
        PicoCode.update({ _id: picoCodeId }, $scope.picoCode).$promise.then(function (data) {
          toastr.success(data.ontologyName, 'Lagret');
          $location.path(baseUrl + data.picoCodeId);
        }, function (error) {
          Crud.handlePostError(error);
        });
      } else if (typeof picoId != 'undefined' && picoId != null) {
        Pico.addPicoCode({ id: picoId }, $scope.picoCode).$promise.then(function (data) {
          toastr.success(data.ontologyCode, 'Opprettet PicoCode');
          $location.path(baseUrl + data.picoCodeId);
        }, function (error) {
          Crud.handlePostError(error);
        });
      }
    };
    $scope.deletePicoCodeBtnClick = function () {
      var picoCodeToDelete = $scope.picoCode;
      PicoCode.delete({ _id: picoCodeToDelete.picoCodeId }).$promise.then(function () {
        toastr.success('picoCode: ' + picoCodeToDelete.picoCodeId, 'Slettet');
        $location.path('/guideline/' + guidelineId + '/section/' + sectionId + '/recommendation/' + recommendationId + '/pico/' + picoId);
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    $scope.addTaxonomyCodeBtnClick = function () {
      $location.path(baseUrl + picoCodeId + '/taxonomyCode/0').search('schemaSystem', $scope.picoCode.ontologyName).search('schemaId', $scope.picoCode.ontologyName);
    };
    $scope.deleteTaxonomyCodeBtnClick = function (index) {
      var taxonomyCodeToDelete = $scope.picoCode.taxonomyCodes[index];
      TaxonomyCode.delete({ _id: taxonomyCodeToDelete.taxonomyCodeId }).$promise.then(function () {
        toastr.success('taxonomyCode: ' + taxonomyCodeToDelete.taxonomyCodeId, 'Slettet');
        $scope.picoCode.taxonomyCodes.splice(index, 1);
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
  }
]);
angular.module('webUiApp').factory('PicoCode', [
  '$resource',
  'apiUrl',
  'Crud',
  'toastr',
  'apiUrl',
  function ($resource, apiUrl, Crud, toastr) {
    var service = {};
    var resource = $resource(apiUrl + 'picoCodes/:_id', {}, {
        update: { method: 'PUT' },
        addTaxonomyCode: {
          method: 'POST',
          params: { id: '@id' },
          url: apiUrl + 'picoCodes/:id/taxonomyCodes/'
        }
      });
    service.deletePicoCode = function (picoCode) {
      return resource.delete({ _id: picoCode.picoCodeId }).$promise.then(function () {
        toastr.success('Slettet');
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    service.addTaxonomyCode = function (picoCodeId, taxonomyCode) {
      return resource.addTaxonomyCode({ id: picoCodeId }, taxonomyCode).$promise.then(function (data) {
        toastr.success('La til taksonomikode');
        return data;
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    return service;
  }
]);
'use strict';
/**
 * @ngdoc directive
 * @name webUiApp.directive:taxonomycodesList
 * @description
 * # taxonomycodesList
 */
angular.module('webUiApp').directive('taxonomycodesList', function () {
  return {
    templateUrl: 'components/guidelines/guideline/section/recommendation/pico/picocode/_taxonomycodeslist.html',
    restrict: 'E'
  };
});
'use strict';
/**
 * @ngdoc function
 * @name webUiApp.controller:TaxonomycodeCtrl
 * @description
 * # TaxonomycodeCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp').controller('TaxonomycodeCtrl', [
  '$scope',
  'TaxonomyCode',
  '$stateParams',
  'PicoCode',
  '$location',
  '$timeout',
  'toastr',
  'Crud',
  function ($scope, TaxonomyCode, $stateParams, PicoCode, $location, $timeout, toastr, Crud) {
    $scope.taxonomyCode = {};
    $scope.taxonomyCode.schemaId = $location.search().schemaId;
    $scope.taxonomyCode.schemaSystem = $location.search().schemaSystem;
    var guidelineId = $stateParams.guidelineId;
    var sectionId = $stateParams.sectionId;
    var recommendationId = $stateParams.recommendationId;
    var picoCodeId = $stateParams.picoCodeId;
    var picoId = $stateParams.picoId;
    var taxonomyCodeId = $stateParams.taxonomyCodeId;
    var baseUrl = '/guideline/' + guidelineId + '/section/' + sectionId + '/recommendation/' + recommendationId + '/pico/' + picoId + '/picoCode/' + picoCodeId + '/taxonomyCode/';
    $scope.baseUrl = baseUrl;
    if (taxonomyCodeId != 0) {
      TaxonomyCode.get({ _id: taxonomyCodeId }, function (data) {
        $scope.taxonomyCode = data;
      });
    }
    $scope.updateOrCreateTaxonomyCode = function () {
      if (taxonomyCodeId != 0) {
        TaxonomyCode.update({ _id: taxonomyCodeId }, $scope.taxonomyCode).$promise.then(function (data) {
          toastr.success(data.name, 'Lagret');
          $location.path(baseUrl + data.taxonomyCodeId);
        }, function (error) {
          Crud.handlePostError(error);
        });
      } else if (typeof picoCodeId != 'undefined' && picoCodeId != null) {
        PicoCode.addTaxonomyCode({ id: picoCodeId }, $scope.taxonomyCode).$promise.then(function (data) {
          toastr.success(data.name, 'Opprettet TaxonomyCode');
          $location.path(baseUrl + data.taxonomyCodeId);
        }, function (error) {
          Crud.handlePostError(error);
        });
      }
    };
    $scope.removeTaxonomyCodeBtnClick = function () {
      var taxonomyCodeToDelete = $scope.taxonomyCode;
      TaxonomyCode.delete({ _id: taxonomyCodeToDelete.taxonomyCodeId }).$promise.then(function () {
        toastr.success('taxonomy code: ' + taxonomyCodeToDelete.picoId, 'Slettet');
        $location.path('/guideline/' + guidelineId + '/section/' + sectionId + '/recommendation/' + recommendationId + '/pico/' + picoId + '/picoCode/' + picoCodeId);
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
  }
]);
angular.module('webUiApp').factory('TaxonomyCode', [
  '$resource',
  'apiUrl',
  'toastr',
  'Crud',
  function ($resource, apiUrl, toastr, Crud) {
    var service = {};
    var resource = $resource(apiUrl + 'taxonomycodes/:_id', {}, { update: { method: 'PUT' } });
    service.deleteTaxonomyCode = function (taxonomyCodeId) {
      return resource.delete({ _id: taxonomyCodeId }).$promise.then(function () {
        toastr.success('Slettet');
      }, function (error) {
        Crud.handlePostError(error);
      });
    };
    return service;
  }
]);