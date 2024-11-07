from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.api import router

app = FastAPI(title="Multilingual Chat App")

# Montowanie plików statycznych
app.mount("/static", StaticFiles(directory="static"), name="static")

# Inkluzja routera z endpointami
app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
