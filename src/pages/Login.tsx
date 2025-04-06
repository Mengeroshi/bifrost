import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAccount, useConnect } from "wagmi";
import metmaskIcon from "../assets/metamask.png";
import { Navbar } from "@/components/Navbar";

export function Login() {
  const navigate = useNavigate();
  const { connectors, connect } = useConnect();

  const { isConnected } = useAccount();
  useEffect(() => {
    if (isConnected === false) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [isConnected]);

  const metamaskConector = connectors[0];

  return (
    <div>
      <Navbar />
      <Button
        key={metamaskConector.uid}
        onClick={() => connect({ connector: metamaskConector })}
      >
        <img src={metmaskIcon} className="size-4" /> Login with{" "}
        {metamaskConector.name}
      </Button>
    </div>
  );
}
