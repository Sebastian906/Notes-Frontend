import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import Toast from '../../components/ToastMessage/Toast'

const Home = () => {

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: 'add',
        data: null,
    });

    const [showToastMessage, setShowToastMessage] = useState({
        isShown: false,
        message: "",
        type: "add",
    });

    const [allNotes, setAllNotes] = useState([]);
    const [userInfo, setUserInfo] = useState(null);

    const navigate = useNavigate();

    const handleEdit = (noteDetails) => {
        setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
    }

    const showMessage = (message, type) => {
        setShowToastMessage({
            isShown: true,
            message,
            type,
        });
    };

    const handleCloseToast = () => {
        setShowToastMessage({
            isShown: false,
            message: "",
        });
    };

    // API de Obtener Usuarios
    const getsUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }
    };

    // Obtener todas las notas
    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get("/get-notes");

            if (response.data && response.data.notes) {
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.log("Ocurrio un error sin precedentes. Por favor intente de nuevo.");
        }
    }

    useEffect(() => {
        getsUserInfo();
        getAllNotes();
        return () => {};
    }, []);

    return (
        <>
            <Navbar userInfo={userInfo}/>

            <div className='container mx-auto'>
                <div className='grid grid-cols-3 gap-4 mt-8'>
                    {allNotes.map((item, index) => (
                        <NoteCard 
                            key={item._id}
                            title={item.title} 
                            date={item.createdOn}
                            content={item.content}
                            tags={item.tags}
                            isPinned={item.isPinned}
                            onEdit={()=>handleEdit(item)}
                            onDelete={()=>{}}
                            onPinNote={()=>{}}
                        />
                    ))}
                </div>
            </div>

            <button 
                className='w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-blue-600 absolute right-10 bottom-10' 
                onClick={() => {
                    setOpenAddEditModal({ isShown: true, type: 'add', data: null });
                }}
            >
                <MdAdd className='text-[32px] text-white'/>
            </button>

            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => {}}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.2)',
                    },
                }}
                contentLabel=''
                className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll'
            >

                <AddEditNotes
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    onClose={() => {
                        setOpenAddEditModal({ isShown: false, type: 'add', date: null });
                    }}
                    getAllNotes={getAllNotes}
                    showMessage={showMessage}
                />

            </Modal>

            <Toast
                isShown={showToastMessage.isShown}
                message={showToastMessage.message}
                type={showToastMessage.type}
                onClose={handleCloseToast}
            />
        </>
    );
};

export default Home