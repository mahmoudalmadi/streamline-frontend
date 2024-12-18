const [isVisible, setIsVisible] = useState(false);
    const [isDropdownClosing, setIsDropdownClosing] = useState(false);
    const toggleVisibility = () => {
        if (isDropdownClosing) return; // Prevent reopening if in closing state
        setIsVisible(prev => !prev);
    };
    const handleCloseDropdown = () => {
        setIsDropdownClosing(true); // Set closing flag
        toggleVisibility(false);
        setTimeout(() => setIsDropdownClosing(false), 500); // Reset after a short delay
    };

    <div className="relative text-center ml-[10px] w-[25px] h-[25px] border rounded-full border-streamlineBlue font-bold text-streamlineBlue border-[1.5px] pb-[1px] hover:bg-gray-100 cursor-pointer" onClick={toggleVisibility}>
                    <div className="mb-[8px]">i
                    </div>
                    <InfoDropdown isVisible={isVisible} onClose={handleCloseDropdown} categories={categoryDict}/>
                    </div>
                    