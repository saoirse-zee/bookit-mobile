import { SQLite } from 'expo'

const db = SQLite.openDatabase({ name: 'bookit.db' })
db.transaction((tx) => {
  tx.executeSql(
    'create table if not exists items (id integer primary key not null, done int, value text);'
  )
})

db.transaction((tx) => {
  tx.executeSql(
    'select * from items where done = ?;',
    [this.props.done ? 1 : 0],
    (_, { rows: { _array } }) => this.setState({ items: _array })
  )
})

export default db
