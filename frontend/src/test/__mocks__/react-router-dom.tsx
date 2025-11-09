export const useNavigate = () => jest.fn();

export const useParams = () => ({});

export const useLocation = () => ({
	pathname: "/",
	search: "",
	hash: "",
	state: null,
});

export const Link = ({children}: any) => children;

export const BrowserRouter = ({children}: any) => children;

export const Routes = ({children}: any) => children;

export const Route = ({element}: any) => element;

export const Navigate = () => null;
