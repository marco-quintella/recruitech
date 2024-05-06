import type { QTableProps } from 'quasar'

export function usePagination() {
  const pagination = ref({
    descending: false,
    page: 1,
    rowsNumber: 0,
    rowsPerPage: 5,
    sortBy: undefined as string | undefined,
  })

  function updatePagination(data?: Ref<any>) {
    const _data = toValue(data)
    pagination.value.descending = _data?.value?.meta?.pagination?.direction === 'desc' ?? 'asc'
    pagination.value.page = _data?.value?.meta?.pagination?.page ?? pagination.value.page
    pagination.value.rowsNumber = _data?.value?.meta?.pagination?.total ?? pagination.value.rowsNumber
    pagination.value.rowsPerPage = _data?.value?.meta?.pagination?.pageSize ?? pagination.value.rowsPerPage
    pagination.value.sortBy = _data?.value?.meta?.pagination?.orderBy ?? pagination.value.sortBy
  }

  async function onRequest(
    props?: Parameters<NonNullable<QTableProps['onRequest']>>[0],
  ) {
    pagination.value.page = props?.pagination?.page ?? pagination.value.page
    pagination.value.rowsPerPage = props?.pagination?.rowsPerPage ?? pagination.value.rowsPerPage
    pagination.value.descending = props?.pagination?.descending ?? pagination.value.descending
    pagination.value.sortBy = props?.pagination?.sortBy as string | undefined ?? pagination.value.sortBy
  }

  return {
    onRequest,
    pagination,
    updatePagination,
  }
}
