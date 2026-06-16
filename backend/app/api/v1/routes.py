from fastapi import APIRouter

from .endpoints.health import router as health_router
from .endpoints.debate import router as debate_router
from .endpoints.patients import router as patients_router

router = APIRouter(prefix="/v1")
router.include_router(health_router)
router.include_router(patients_router)
router.include_router(debate_router)

