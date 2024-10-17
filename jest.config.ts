export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/'],
  testRegex: '.test.(tsx?)$',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)?$': [
      'ts-jest',
      { babelConfig: true, tsconfig: 'tsconfig.app.json' },
    ],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@react-dnd|react-dnd|dnd-core|react-dnd-html5-backend|@minoru/react-dnd-treeview)',
  ],
};
