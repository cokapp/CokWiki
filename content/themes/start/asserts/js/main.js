jQuery(function($) {
    $(document).ready(function() {
        hljs.initHighlightingOnLoad();

        initSidebar();

        initEditor();
    });
});




function initSidebar() {
    var jPM = $.jPanelMenu({
        menu: '#left-col',
        trigger: '.wiki-sidebar-toggle a',
        openPosition: '180px'
    });
    jPM.on();
}

function initEditor() {

    if ($('#epiceditor').length == 0) {
        return;
    }

    var opts = {
        container: 'epiceditor',
        textarea: 'source',
        basePath: '/asserts/libs/EpicEditor/',
        clientSideStorage: false,
        localStorageName: 'epiceditor',
        useNativeFullscreen: true,
        parser: marked,
        // parser: function(source){

        // },
        file: {
            name: 'epiceditor',
            defaultContent: '',
            autoSave: 100
        },
        theme: {
            base: '/themes/base/epiceditor.css',
            preview: '/themes/preview/github.css',
            editor: '/themes/editor/epic-light.css'
        },
        button: {
            preview: true,
            fullscreen: true,
            bar: 'show'
        },
        focusOnLoad: false,
        shortcut: {
            modifier: 18,
            fullscreen: 70,
            preview: 80
        },
        string: {
            togglePreview: '预览模式',
            toggleEdit: '编辑模式',
            toggleFullscreen: '全屏编辑'
        },
        autogrow: {
          minHeight: 480,
          maxHeight: false,
          scroll: true
        }
    }
    var editor = new EpicEditor(opts);
    editor.load();
}
