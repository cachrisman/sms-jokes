module.exports = function (migration) {
  const sport = migration.createContentType('sport')
    .name('Sport')
    .description('A content type describing a sport')

  person.createField('name')
    .name('Name')
    .type('Symbol')
    .required(true)
    .validations([{ unique: true }]);

  const joke = migration.createContentType('joke')
    .description('A joke')
    .name('Joke')

  joke.createField('title')
    .name('Title')
    .type('Symbol')
    .required(true)
    .validations([{ unique: true }]);

  joke.createField('sport')
    .name('Sport')
    .type('Link')
    .linkType('Entry')
    .required(true)
    .validations([{ linkContentType: ['sport']}])

  joke.createField('body')
    .name('Body')
    .type('Text')
    .required(true)

}
