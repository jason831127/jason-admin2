export default function ({ store, error }) {
  if (!store.state.globalParams) {
    error({
      message: 'config error',
      statusCode: 403
    })
  }
}
