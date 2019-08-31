export const config: object = {
    extraPlugins: 'autogrow',
    autoGrow_minHeight: 500,
    language: 'en',

    toolbarGroups: [
        { name: 'clipboard', groups: ['clipboard', 'undo'] },
        { name: 'document', groups: ['document', 'mode', 'doctools'] },
        { name: 'tools', groups: ['tools'] },
        {
            name: 'editing',
            groups: ['find', 'selection', 'spellchecker', 'editing'],
        },
        { name: 'forms', groups: ['forms'] },
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'links', groups: ['links'] },
        { name: 'insert', groups: ['insert'] },
        { name: 'colors', groups: ['colors'] },
        {
            name: 'paragraph',
            groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'],
        },
        { name: 'styles', groups: ['styles'] },
        { name: 'others', groups: ['others'] },
        { name: 'about', groups: ['about'] },
    ],
    removePlugins: 'resize',
};
