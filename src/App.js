import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Router/Router';

function App() {
  return (
    <div className="max-w-[1400px] mx-auto scroll-pt-[68px]">
      <RouterProvider router={router}></RouterProvider>
      <Toaster/>
    </div>
  );
}

export default App;
