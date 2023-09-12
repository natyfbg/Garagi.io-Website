import { useGetLoggedInAdminQuery } from "../services/admin";
import { useGetLoggedInCompanyQuery } from "../services/company";
import { useGetLoggedInStudentQuery } from "../services/student";

export const useAuthentication = () => {
    const { isLoading: isLoadingStudent, error: errorStudent } = useGetLoggedInStudentQuery();
    const { isLoading: isLoadingCompany, error: errorCompany } = useGetLoggedInCompanyQuery();
    const { isLoading: isLoadingAdmin, error: errorAdmin } = useGetLoggedInAdminQuery();

    return {
        isLoadingStudent,
        isLoadingCompany,
        isLoadingAdmin,
        errorStudent,
        errorCompany,
        errorAdmin,
    };
};