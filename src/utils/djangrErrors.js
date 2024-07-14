export const djangoErrors = (error) => {
    if (error.response.data.non_field_errors) {
        return error.response.data.non_field_errors[0]
    } else if (error.response.data.detail) {
        return error.response.data.detail
    } else {
        return error.response.data.content[0]
    }
}