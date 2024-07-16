import type { QTableProps } from 'quasar'

export function usePagination() {
  const pagination = ref({
    descending: false,
    page: 1,
    rowsNumber: 0,
    rowsPerPage: 20,
    sortBy: undefined as string | undefined,
  })

  function updatePagination(data?: MaybeRefOrGetter<any>) {
    const _data = toValue(data)

    pagination.value.descending = _data?.meta?.pagination?.direction === 'desc' || pagination.value.descending
    pagination.value.page = _data?.meta?.pagination?.page || pagination.value.page
    pagination.value.rowsNumber = _data?.meta?.pagination?.total || pagination.value.rowsNumber
    pagination.value.rowsPerPage = _data?.meta?.pagination?.pageSize || pagination.value.rowsPerPage
    pagination.value.sortBy = _data?.meta?.pagination?.orderBy || pagination.value.sortBy
  }

  async function onRequest(
    props?: Parameters<NonNullable<QTableProps['onRequest']>>[0],
  ) {
    pagination.value.page = props?.pagination?.page || pagination.value.page
    pagination.value.rowsPerPage = props?.pagination?.rowsPerPage || pagination.value.rowsPerPage
    pagination.value.descending = props?.pagination?.descending ?? pagination.value.descending
    pagination.value.sortBy = props?.pagination?.sortBy as string | undefined || pagination.value.sortBy
  }

  return {
    onRequest,
    pagination,
    updatePagination,
  }
}
