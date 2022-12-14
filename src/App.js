import React from "react";
import "./App.css";
import ExcelPoc from "./pages/ExcelPoc";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const rootTheme = createTheme({});
const queryClient = new QueryClient();
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={rootTheme}>
				<div className="App">
					<ExcelPoc />
				</div>
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
