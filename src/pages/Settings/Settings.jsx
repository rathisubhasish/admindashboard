import Button from "../../common/Button/Button.jsx";

export default function Settings() {
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
                <Button variant="primary">
                    Change Password
                </Button>
            </div>
        </div>
    </div>
  );
}
