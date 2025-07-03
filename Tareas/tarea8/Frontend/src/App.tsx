// src\App.tsx

//import { useState } from 'react';
import { Toaster } from 'react-hot-toast'; // Componente para mostrar notificaciones emergentes
import { Header } from './components/Header';               // Encabezado principal de la aplicación
import { BoardManager } from './components/BoardManager';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthPage } from './components/AuthPage';
import { useEffect } from "react";
import { useAuthStore } from "./stores/authStore";
import { useTabs, useCreateTab } from "./hooks/tabs";
import { useQueryClient } from '@tanstack/react-query';
import { NotFound } from './components/ErrorBoundary';
import toast from 'react-hot-toast';

export default function App() {
  const checkAuth = useAuthStore((s) => s.checkAuth);
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const location = useLocation();
  const { data: tabs = [] } = useTabs();
  const queryClient = useQueryClient();
  const createTab = useCreateTab();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Forzar refetch de tableros cuando el usuario cambia (por ejemplo, tras login)
  useEffect(() => {
    if (user) {
      queryClient.invalidateQueries({ queryKey: ['tabs'] });
    }
  }, [user, queryClient]);

  // Log para debugging
  /*
  useEffect(() => {
    console.log("Estado de autenticación:", { user, isAuthenticated, location: location.pathname });
  }, [user, isAuthenticated, location.pathname]);
  */
  // Encuentra el primer tablero si existe
  const firstBoardPath = tabs.length > 0 ? `/board/${encodeURIComponent(tabs[0].title)}` : "/board";

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <>
        <Toaster position="top-right" />
        <Header />
        <main style={{
          maxWidth: 600,
          margin: '20px auto',
          padding: 20,
          backgroundColor: 'white',
          borderRadius: 10,
          boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }}>
          <div className="text-center text-gray-600 py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            Verificando autenticación...
          </div>
        </main>
      </>
    );
  }

  // Si el usuario NO está autenticado y está en la raíz, muestra el login
  if (!isAuthenticated && location.pathname === "/") {
    return (
      <>
        <Toaster position="top-right" />
        <Header />
        <main style={{
          maxWidth: 600,
          margin: '20px auto',
          padding: 20,
          backgroundColor: 'white',
          borderRadius: 10,
          boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }}>
          <AuthPage />
        </main>
      </>
    );
  }

  // Redirige solo si usuario autenticado, tableros listos y está en "/" Y hay tableros
  if (isAuthenticated && tabs.length > 0 && location.pathname === "/") {
    console.log("Redirigiendo a primer tablero:", firstBoardPath);
    return <Navigate to={firstBoardPath} replace />;
  }

  // Si el usuario está autenticado y no tiene tableros, muestra una pantalla de bienvenida con botón de crear tablero
  if (isAuthenticated && tabs.length === 0 && location.pathname === "/") {
    return (
      <>
        <Toaster position="top-right" />
        <Header />
        <main style={{
          maxWidth: 600,
          margin: '20px auto',
          padding: 20,
          backgroundColor: 'white',
          borderRadius: 10,
          boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }}>
          <div className="text-center text-gray-600 py-10">
            ¡Bienvenido! Aún no tienes tableros. Usa el botón para crear tu primer tablero.
            <div className="mt-6">
              <button
                onClick={() => {
                  const title = `Tablero 1`;
                  createTab.mutate(title, {
                    onSuccess: (newTab) => {
                      try {
                        toast.success("Tablero creado");
                        // Navegar al nuevo tablero
                        window.location.href = `/board/${encodeURIComponent(newTab.title)}`;
                      } catch (error) {
                        console.error('❌ Error en navegación después de crear primer tablero:', error);
                        toast.error("Tablero creado pero hubo un error de navegación");
                      }
                    },
                    onError: (error) => {
                      console.error('❌ Error al crear primer tablero:', error);
                      toast.error(`Error al crear el tablero: ${error.message}`);
                    }
                  });
                }}
                disabled={createTab.isPending}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createTab.isPending ? 'Creando...' : '+ Crear mi primer tablero'}
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      {/* Encabezado de la aplicación (título, logo, etc.) */}
      <Toaster position="top-right" /> {/* Notificaciones emergentes */}
      <Header />
      {/* Contenedor principal con estilo centrado y tarjeta */}
      <main style={{
        maxWidth: 600,
        margin: '20px auto',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        {/* Rutas de la aplicación */}
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/board/:boardId" element={isAuthenticated ? <BoardManager /> : <Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}


