import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import apiService from "@/components/api/apiService";
import endPoints from "@/components/api/endPoints";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function SignInPage() {
  const { t } = useTranslation(["auth", "common"]);
  const navigate = useNavigate();

  // State to capture user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState(null);

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      username: email,
      password,
    };

    try {
      const responses: any = await apiService.post(endPoints.login, formData, {
        headers: { requiresAuth: false },
      });
      setResponse(responses?.message ?? null);
      console.log(responses);
      // localStorage.setItem("xy9a7b", response.data.jwt);

      // Navigate based on role from backend
      switch (responses?.role) {
        case "REGISTRAR":
          navigate("/registrar");
          break;
        case "STUDENT":
          navigate("/student");
          break;
        case "DEAN":
          navigate("/dean");
          break;
        default:
          console.log("Role not handled:", responses?.role);
      }
    } catch (err: any) {
      setError(err?.response?.data?.error || "failed to login");
      console.log(err?.response?.data?.error);
      console.error("Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <div className="flex justify-between items-center p-4">
        <Link
          to="/"
          className="flex items-center text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("common:back")} to {t("navigation:home")}
        </Link>
        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">{t("welcomeBack")}</CardTitle>
              <CardDescription>{t("signInToAccount")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Email input */}
              <div className="space-y-2">
                <Label htmlFor="email">{t("common:email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@dhfm-college.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password input */}
              <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t("enterPassword")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button onClick={handleSubmit} className="w-full">
                {t("signIn")}
              </Button>

              {response && (
                <p className="text-green-600">{JSON.stringify(response)}</p>
              )}
              {error && <p className="text-red-600">{JSON.stringify(error)}</p>}

              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t("newStudent")}{" "}
                  <Link
                    to="/register"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    {t("registerHere")}
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
