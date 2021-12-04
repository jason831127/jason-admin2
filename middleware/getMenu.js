export default function ({ store, error }) {
  if (!store.state.menu) {
    error({
      message: 'menu error',
      statusCode: 403
    })
  }
}
