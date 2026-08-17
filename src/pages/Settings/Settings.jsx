import Button from "../../common/Button/Button.jsx";
import { useState } from "react";
import Modal from "../../common/Modal/Modal.jsx";
import ChangePassword from "./ChangePassword.jsx";

export default function Settings() {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <h1 className="text-xl">Settings</h1>
      <p className="text-sm text-text-secondary mt-1">
        Manage all configuration in your workspace
      </p>
      <br />
      <div className="w-full flex gap-4 justify-between items-center bg-bg px-4 py-4 rounded-lg">
        <div>
          <p className="text-xl font-medium">Account Password</p>
          <p className="text-sm">Reset your password here</p>
        </div>
        <div>
          <Button variant="primary" onClick={() => setModalOpen(true)}>
            Change Password
          </Button>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title="Password Change"
          onClose={() => setModalOpen(false)}
          width={340}
        >
          <ChangePassword setModalOpen={setModalOpen} />
        </Modal>
      )}
    </div>
  );
}
