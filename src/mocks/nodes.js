export default [
  {
    label: 'img.ly',
    children: [
      {
        label: 'Workspace A',
        children: [
          { id: 'imgly.A.1', label: 'Entry 1' },
          { id: 'imgly.A.2', label: 'Entry 2' },
          { id: 'imgly.A.3', label: 'Entry 3' },
        ],
      },
      {
        label: 'Workspace B',
        children: [
          { id: 'imgly.B.1', label: 'Entry 1' },
          { id: 'imgly.B.2', label: 'Entry 2' },
          {
            label: 'Entry 3',
            children: [
              {
                id: 'imgly.B.3.1',
                label: 'Sub-Entry 1',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: '9elements',
    children: [
      {
        label: 'Workspace A',
        children: [
          {
            id: '9e.A.1',
            label: 'Entry 1',
          },
          {
            id: '9e.A.2',
            label: 'Entry 2',
          },
        ],
      },
    ],
  },
];
